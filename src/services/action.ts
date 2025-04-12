import { AdbContextType } from "src/context/AdbProvider";
import {
  getReleaseAssetUrl,
  InstallerAction,
  InstallerRelease,
} from "./installer";
import { fetchGithubAsset } from "src/api/githubProxy";
import { useRunnerStore } from "src/hooks/state/runnerStore";
import { v4 as uuidv4 } from "uuid";
import { ADB_INSTALL_TMP_DIR, ADB_SHELL_TIMEOUT } from "src/config/adbConfig";

export interface ActionProgress {
  status: ActionStatus;
  startTime?: Date;
  endTime?: Date;
}

export type ActionStatus = "idle" | "running" | "done" | "error";

export interface ActionStage {
  id: string;
  command: string;
  output?: string;
  progress: ActionProgress;
}

interface ExecutableStage {
  execute: () => Promise<boolean>;
}

export class ActionRunner {
  protected adb: AdbContextType;
  protected release: InstallerRelease;
  protected action: InstallerAction;

  protected readonly store = useRunnerStore.getState();

  protected actionAssets: Record<string, any> = {};
  protected queuedStages: ExecutableStage[] = [];

  constructor(
    adb: AdbContextType,
    release: InstallerRelease,
    action: InstallerAction
  ) {
    this.adb = adb;
    this.release = release;
    this.action = action;
  }

  private createStage(command: string, toExecute: () => Promise<string>) {
    const store = useRunnerStore.getState();
    const id = uuidv4();

    store.addStage({
      id: id,
      command,
    });

    const execute = async () => {
      store.updateStage(id, {
        progress: {
          startTime: new Date(),
          status: "running",
        },
      });

      try {
        const output = await toExecute();

        store.updateStage(id, {
          progress: {
            status: "done",
            endTime: new Date(),
          },
          output,
        });

        return true;
      } catch (e) {
        store.updateStage(id, {
          progress: {
            status: "error",
            endTime: new Date(),
          },
          output:
            e instanceof Error
              ? e.message
              : "Stage threw non error (bug in stage!)",
        });

        return false;
      }
    };

    this.queuedStages.push({ execute });
  }

  private createDownloadActionScriptStage() {
    this.createStage("Downloading action script", async () => {
      this.actionAssets["action_script"] = await fetchGithubAsset(
        getReleaseAssetUrl(this.release, this.action.script)!
      );

      return "Script fetched";
    });
  }

  private createDownloadAssetStage(assetName: string) {
    this.createStage(`Downloading '${assetName}'`, async () => {
      this.actionAssets[assetName] = await fetchGithubAsset(
        getReleaseAssetUrl(this.release, assetName)!,
        "blob"
      );

      return "Asset downloaded";
    });
  }

  private parseShellOutput(output: string): {
    done: boolean;
    returnCode: number;
  } {
    const regex = /^(?:(\d+)\|)?ai-pin:/m;
    const match = output.match(regex);

    // Determine if the prompt is found.
    const done = match !== null;

    // If the optional return code group is present, parse it as an integer; otherwise default to 0.
    const returnCode =
      match && match[1] !== undefined ? parseInt(match[1], 10) : 0;

    return { done, returnCode };
  }

  private createAdbShellStage(command: string) {
    this.createStage(
      `Running '${command}'`,
      () =>
        new Promise<string>((resolve, reject) => {
          let shellOutput = "";
          let cmdTimeout: NodeJS.Timeout | undefined;

          this.adb.sendCommand(command); // Todo: probably catch error here

          const unsubscribeShell = this.adb.subscribeOutput((data: string) => {
            shellOutput += data;

            const { done, returnCode } = this.parseShellOutput(shellOutput);

            if (done) {
              unsubscribeShell();
              clearTimeout(cmdTimeout);

              if (returnCode != 0) {
                reject(new Error(`Command failed\n${shellOutput}`));
              }
              resolve(shellOutput);
            }
          });

          cmdTimeout = setTimeout(() => {
            unsubscribeShell();
            reject(new Error("Command timed out"));
          }, ADB_SHELL_TIMEOUT);
        })
    );
  }

  private createAdbPushStage(assetName: string, remotePath: string) {
    this.createDownloadAssetStage(assetName);
    this.createStage(`Pushing '${assetName}' to '${remotePath}'`, async () => {
      const asset = this.actionAssets[assetName] as Blob;
      await this.adb.pushFile(asset, remotePath);

      return "Asset pushed";
    });
  }

  private createAdbInstallStage(assetName: string) {
    const remotePath = ADB_INSTALL_TMP_DIR + assetName;

    this.createAdbPushStage(assetName, remotePath);
    this.createAdbShellStage(`pm install -t -r "${remotePath}"`);
    this.createAdbShellStage(`rm "${remotePath}"`);
  }

  private createParseActionStage() {
    this.createStage("Creating stages", async () => {
      const script = this.actionAssets["action_script"] as string;

      const lines = script
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      for (const line of lines) {
        if (line.startsWith("adb shell")) {
          // We expect the format: "adb shell ..."
          const commandStr = line.substring("adb shell".length).trim();
          this.createAdbShellStage(commandStr);
        } else if (line.startsWith("adb push")) {
          // Split the command into its parts.
          // We expect the format: "adb push <assetName> <remotePath>"
          const parts = line.split(/\s+/);
          if (parts.length >= 4) {
            const assetName = parts[2];
            // In case the remote path contains spaces, join any remaining parts.
            const remotePath = parts.slice(3).join(" ");
            this.createAdbPushStage(assetName!, remotePath);
          } else {
            throw new Error(`Invalid adb push command: ${line}`);
          }
        } else if (line.startsWith("adb install")) {
          // We expect the format: "adb install <assetName>"
          const parts = line.split(/\s+/);
          if (parts.length >= 3) {
            const assetName = parts[2];
            this.createAdbInstallStage(assetName!);
          } else {
            throw new Error(`Invalid adb install command: ${line}`);
          }
        } else {
          throw new Error(`Unknown/unsupported adb command: ${line}`);
        }
      }

      return "Stages created";
    });
  }

  async start() {
    this.store.reset();
    this.store.setActionName(this.action.title);
    this.store.updateProgress({
      status: "running",
      startTime: new Date(),
    });

    this.actionAssets = {};
    this.queuedStages = [];

    this.createDownloadActionScriptStage();
    this.createParseActionStage();
    console.log(this.queuedStages);

    let didError = false;
    while (this.queuedStages.length != 0 && !didError) {
      const success = await this.queuedStages.shift()!.execute();
      if (!success) didError = true;
    }

    this.store.updateProgress({
      status: didError ? "error" : "done",
      endTime: new Date(),
    });
  }
}
