import { useEffect, useRef } from "react";
import Terminal, { TerminalHandle } from "../../components/Terminal";
import { useAdb } from "../../context/AdbProvider";
import { Paper } from "@mantine/core";
import PageLayout from "../../layouts/PageLayout";

const Console = () => {
  const { sendCommand, subscribeOutput } = useAdb();
  const terminalRef = useRef<TerminalHandle | null>(null);

  // Subscribe to ADB output and write it to the Terminal.
  useEffect(() => {
    const unsubscribe = subscribeOutput((data: string) => {
      terminalRef.current?.write(data);
    });
    return () => unsubscribe();
  }, [subscribeOutput]);

  return (
    <PageLayout title="ADB Console">
      <Paper h="600px" p="md" bg="#000" withBorder>
        <Terminal
          ref={terminalRef}
          onCommand={(command: string) => {
            sendCommand(command);
          }}
        />
      </Paper>
    </PageLayout>
  );
};

export default Console;
