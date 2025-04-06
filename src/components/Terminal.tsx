import {
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Terminal as XTerminal } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";

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
    const fitAddonRef = useRef<FitAddon | null>(null);
    // Buffer to keep track of what the user has typed.
    const inputBuffer = useRef<string>("");

    useLayoutEffect(() => {
      if (containerRef.current) {
        const terminal = new XTerminal({
          cursorBlink: true,
          convertEol: true,
        });
        xtermRef.current = terminal;
        terminal.open(containerRef.current);
        terminal.focus();

        // Initialize and load the FitAddon to automatically adjust the terminal size.
        const fitAddon = new FitAddon();
        fitAddonRef.current = fitAddon;
        terminal.loadAddon(fitAddon);
        fitAddon.fit();

        // Re-fit the terminal when the window is resized.
        const handleResize = () => {
          fitAddon.fit();
        };
        window.addEventListener("resize", handleResize);

        // Listen for key events
        terminal.onKey(({ key, domEvent }) => {
          const ev = domEvent;
          const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
          if (ev.key === "Backspace") {
            if (inputBuffer.current.length > 0) {
              inputBuffer.current = inputBuffer.current.slice(0, -1);
              terminal.write("\b \b");
            }
          } else if (ev.key === "Enter") {
            // Erase only the user-typed content.
            const len = inputBuffer.current.length;
            for (let i = 0; i < len; i++) {
              terminal.write("\b \b");
            }
            const command = inputBuffer.current;
            onCommand(command);
            inputBuffer.current = "";
          } else if (printable && ev.key.length === 1) {
            inputBuffer.current += ev.key;
            terminal.write(ev.key);
          }
        });

        return () => {
          window.removeEventListener("resize", handleResize);
          terminal.dispose();
        };
      }
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
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "monospace",
        }}
      />
    );
  }
);

export default Terminal;
