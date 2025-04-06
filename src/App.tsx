import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { useEffect, useRef } from "react";
import { AdbProvider, useAdb } from "./context/AdbProvider";

import "xterm/css/xterm.css";
import Terminal, { TerminalHandle } from "./components/Terminal";

const AdbConsole: React.FC = () => {
  const { connect, disconnect, sendCommand, subscribeOutput } = useAdb();
  const terminalRef = useRef<TerminalHandle | null>(null);

  // Subscribe to ADB output and write it to the Terminal.
  useEffect(() => {
    const unsubscribe = subscribeOutput((data: string) => {
      // Simply append the data.
      terminalRef.current?.write(data);
    });
    return () => unsubscribe();
  }, [subscribeOutput]);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
      <div style={{ height: "300px", width: "100%" }}>
        <Terminal
          ref={terminalRef}
          onCommand={(command: string) => {
            sendCommand(command);
          }}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AdbProvider>
        <AdbConsole />
      </AdbProvider>
    </MantineProvider>
  );
}
