import React, {
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Terminal as XTerminal } from "xterm";
import "xterm/css/xterm.css";

export interface TerminalHandle {
  /**
   * Write data to the terminal.
   */
  write: (data: string) => void;
}

export interface TerminalProps {
  /**
   * Called when the user submits a command.
   */
  onCommand: (command: string) => void;
}

/**
 * A reusable Terminal component built with xterm.js.
 * It captures user keystrokes for local echo.
 * When Enter is pressed, it erases the locally echoed command (using backspaces)
 * so that only the output from the backend (e.g. ADB) is displayed.
 */
const Terminal = forwardRef<TerminalHandle, TerminalProps>(
  ({ onCommand }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<XTerminal | null>(null);
    // Buffer to keep track of what the user has typed.
    const inputBuffer = useRef<string>("");

    useLayoutEffect(() => {
      if (containerRef.current) {
        xtermRef.current = new XTerminal({
          cursorBlink: true,
          convertEol: true,
        });
        xtermRef.current.open(containerRef.current);
        xtermRef.current.focus();

        // Listen for key events
        xtermRef.current.onKey(({ key, domEvent }) => {
          const ev = domEvent;
          const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
          if (ev.key === "Backspace") {
            if (inputBuffer.current.length > 0) {
              inputBuffer.current = inputBuffer.current.slice(0, -1);
              xtermRef.current?.write("\b \b");
            }
          } else if (ev.key === "Enter") {
            // Instead of clearing the entire line,
            // erase only what the user typed by sending backspaces.
            const len = inputBuffer.current.length;
            for (let i = 0; i < len; i++) {
              xtermRef.current?.write("\b \b");
            }
            // Then move to a new line.
            xtermRef.current?.write("\r\n");
            const command = inputBuffer.current;
            onCommand(command);
            inputBuffer.current = "";
          } else if (printable && ev.key.length === 1) {
            inputBuffer.current += ev.key;
            xtermRef.current?.write(ev.key);
          }
        });
      }
      return () => {
        xtermRef.current?.dispose();
      };
    }, [onCommand]);

    useImperativeHandle(
      ref,
      () => ({
        write: (data: string) => {
          xtermRef.current?.write(data);
        },
      }),
      []
    );

    return (
      <div
        ref={containerRef}
        style={{
          height: "300px", // Ensure explicit height
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "monospace",
          padding: "10px",
        }}
      />
    );
  }
);

export default Terminal;
