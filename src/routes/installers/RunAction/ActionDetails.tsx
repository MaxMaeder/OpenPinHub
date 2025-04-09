import { Button, Paper, Space, Stack, Text } from "@mantine/core";
import MdDoc from "src/components/MdDoc";
import PageSection from "src/components/PageSection";
import { useAdb } from "src/context/AdbProvider";
import { useRunnerActions, useRunnerStatus } from "src/hooks/state/runnerStore";
import { ActionRunner, ActionStatus } from "src/services/action";
import {
  getReleaseAssetUrl,
  InstallerAction,
  InstallerRelease,
} from "src/services/installer";
import ActionOutput from "./ActionOutput";
import { useEffect } from "react";

type ActionDetailsProps = {
  release: InstallerRelease;
  action: InstallerAction;
};

const getRunnerDetails = (
  status: ActionStatus
): { text: string; loading: boolean } => {
  switch (status) {
    case "idle":
      return { text: "Run", loading: false };
    case "running":
      return { text: "Running...", loading: true };
    case "done":
    case "error":
      return { text: "Run Again", loading: false };
  }
};

const ActionDetails = ({ release, action }: ActionDetailsProps) => {
  const actionDoc = getReleaseAssetUrl(release, action.doc);
  const adb = useAdb();
  const isConnected = !!adb.connInfo;

  const runnerStatus = useRunnerStatus();
  const btnDetails = getRunnerDetails(runnerStatus);

  const { reset } = useRunnerActions();
  useEffect(() => {
    reset();
  }, [reset]);

  const handleRunAction = () => {
    const runner = new ActionRunner(adb, release, action);
    runner.start();
  };

  return (
    <Stack>
      {actionDoc && (
        <PageSection title="Action Instructions">
          <MdDoc assetUrl={actionDoc} w="100%" maw="1000px" />
        </PageSection>
      )}
      <PageSection title="Run Action">
        <Paper p="md" withBorder w="100%" maw="1000px">
          <Stack align="start" gap={0}>
            <Text>
              <b>Release Name:</b> {release.name}
            </Text>
            <Text>
              <b>Release Date:</b> {new Date(release.date).toLocaleString()}
            </Text>
            <Text>
              <b>Action Name:</b> {action.title}
            </Text>
            <Space h="lg" />
            {isConnected ? (
              <Button onClick={handleRunAction} loading={btnDetails.loading}>
                {btnDetails.text}
              </Button>
            ) : (
              <Button disabled>No Pin Connected</Button>
            )}
          </Stack>
        </Paper>
      </PageSection>
      <PageSection title="Action Output">
        <ActionOutput />
      </PageSection>
    </Stack>
  );
};

export default ActionDetails;
