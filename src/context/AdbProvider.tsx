import React, { createContext, useContext, ReactNode, useRef } from "react";
import { KeyStore } from "../libs/wadb/KeyStore";
import { Options } from "../libs/wadb/Options";
import { AdbClient } from "../libs/wadb/AdbClient";
import { Shell } from "../libs/wadb/Shell";
import { WebUsbTransport } from "../libs/wadb/transport";
import { remoteAuthHandler } from "../services/adbAuth";
import { EventEmitter } from "events";

// A simple KeyStore implementation
class MyKeyStore implements KeyStore {
  private keys: CryptoKeyPair[] = [];
  async loadKeys(): Promise<CryptoKeyPair[]> {
    return this.keys;
  }
  async saveKey(key: CryptoKeyPair): Promise<void> {
    this.keys.push(key);
    console.log("Saving Key", key);
  }
}

// Configure wadb options
const options: Options = {
  debug: true,
  useChecksum: false,
  dump: false,
  keySize: 2048,
  authHandler: remoteAuthHandler,
};

interface AdbContextType {
  adbClient: AdbClient | null;
  shell: Shell | null;
  transport: WebUsbTransport | null;
  subscribeOutput: (callback: (data: string) => void) => () => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendCommand: (command: string) => void;
}

const AdbContext = createContext<AdbContextType | null>(null);

interface AdbProviderProps {
  children: ReactNode;
}

export const AdbProvider: React.FC<AdbProviderProps> = ({ children }) => {
  const [adbClient, setAdbClient] = React.useState<AdbClient | null>(null);
  const [shell, setShell] = React.useState<Shell | null>(null);
  const [transport, setTransport] = React.useState<WebUsbTransport | null>(
    null
  );

  // Use an event emitter for output
  const outputEmitter = useRef(new EventEmitter());

  const connect = async () => {
    try {
      const t = await WebUsbTransport.open(options);
      const client = new AdbClient(t, options, new MyKeyStore());
      await client.connect();
      const shellInstance = await client.interactiveShell((data: string) => {
        console.log("Shell output:", data);
        outputEmitter.current.emit("data", data);
      });
      setTransport(t);
      setAdbClient(client);
      setShell(shellInstance);
    } catch (error) {
      console.error("Connection Failed:", error);
    }
  };

  const disconnect = async () => {
    try {
      if (shell) await shell.close();
      if (transport) await transport.close();
      setShell(null);
      setAdbClient(null);
      setTransport(null);
      // Optionally, you might want to emit a disconnect event here.
    } catch (error) {
      console.error("Error closing the connection:", error);
    }
  };

  const sendCommand = (command: string) => {
    if (!shell) {
      console.error("Shell is not connected");
      return;
    }
    shell.write(command + "\n");
  };

  const subscribeOutput = (callback: (data: string) => void) => {
    outputEmitter.current.on("data", callback);
    // Return an unsubscribe function
    return () => {
      outputEmitter.current.off("data", callback);
    };
  };

  return (
    <AdbContext.Provider
      value={{
        adbClient,
        shell,
        transport,
        subscribeOutput,
        connect,
        disconnect,
        sendCommand,
      }}
    >
      {children}
    </AdbContext.Provider>
  );
};

// Custom hook to use the Adb context
export const useAdb = (): AdbContextType => {
  const context = useContext(AdbContext);
  if (!context) {
    throw new Error("useAdb must be used within an AdbProvider");
  }
  return context;
};
