import { useCallback, useEffect, useRef } from "react";
import Terminal, { TerminalHandle } from "../../components/Terminal";
import { useAdb } from "../../context/AdbProvider";
import { Button, Group, Paper, Stack } from "@mantine/core";
import PageLayout from "../../layouts/PageLayout";
import {
  openConfirmRebootModal,
  openDownloadModal,
  openUploadModal,
} from "../../modals";
import { IconDownload, IconPower, IconUpload } from "@tabler/icons-react";
import PageSection from "src/components/PageSection";

const Console = () => {
  const { connInfo, sendCommand, subscribeOutput, reboot } = useAdb();
  const isConn = connInfo != null;

  const terminalRef = useRef<TerminalHandle | null>(null);
  const hasClearedRef = useRef(false);

  useEffect(() => {
    if (!isConn) return;

    const unsubscribe = subscribeOutput((data: string) => {
      terminalRef.current?.write(data);
    });

    if (!hasClearedRef.current) {
      sendCommand("clear");
      hasClearedRef.current = true;
    }

    return () => {
      unsubscribe();
    };
  }, [isConn]);

  const handleReboot = useCallback(async () => {
    await openConfirmRebootModal();
    reboot();
  }, []);

  return (
    <PageLayout title="ADB Console" warnAdbDisconnected>
      <Stack>
        <Paper h="600px" p="md" bg="#000" withBorder>
          <Terminal
            ref={terminalRef}
            onCommand={(command: string) => {
              sendCommand(command);
            }}
          />
        </Paper>
        <PageSection title="Tools">
          <Group>
            <Button
              onClick={openDownloadModal}
              disabled={!isConn}
              rightSection={<IconDownload size={14} />}
            >
              Download File
            </Button>
            <Button
              onClick={openUploadModal}
              disabled={!isConn}
              rightSection={<IconUpload size={14} />}
            >
              Upload File
            </Button>
            <Button
              onClick={handleReboot}
              disabled={!isConn}
              rightSection={<IconPower size={14} />}
            >
              Reboot Pin
            </Button>
          </Group>
        </PageSection>
      </Stack>
    </PageLayout>
  );
};

export default Console;
