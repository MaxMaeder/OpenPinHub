import { createContext, useContext, ReactNode, useRef, useState } from "react";
import { KeyStore } from "../libs/wadb/KeyStore";
import { Options } from "../libs/wadb/Options";
import { AdbClient } from "../libs/wadb/AdbClient";
import { Shell } from "../libs/wadb/Shell";
import { WebUsbTransport } from "../libs/wadb/transport";
import { remoteAuthHandler } from "../services/adbAuth";
import { EventEmitter } from "events";
import { AdbConnectionInformation } from "../libs/wadb/AdbConnectionInformation";
import { ADB_PUSH_CHUNK_SIZE, ADB_PUSH_FILE_PERMS } from "../config/adbConfig";

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

export interface AdbContextType {
  isSupported: boolean;
  adbClient: AdbClient | null;
  shell: Shell | null;
  transport: WebUsbTransport | null;
  connInfo: AdbConnectionInformation | null;
  subscribeOutput: (callback: (data: string) => void) => () => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendCommand: (command: string) => void;
  pullFile: (remotePath: string) => Promise<Blob>;
  pushFile: (blob: Blob, remotePath: string) => Promise<void>;
}

const AdbContext = createContext<AdbContextType | null>(null);

interface AdbProviderProps {
  children: ReactNode;
}

export const AdbProvider = ({ children }: AdbProviderProps) => {
  const [adbClient, setAdbClient] = useState<AdbClient | null>(null);
  const [shell, setShell] = useState<Shell | null>(null);
  const [transport, setTransport] = useState<WebUsbTransport | null>(null);
  const [connInfo, setConnInfo] = useState<AdbConnectionInformation | null>(
    null
  );

  const isSupported = "usb" in navigator;

  // Use an event emitter for output
  const outputEmitter = useRef(new EventEmitter());

  const connect = async () => {
    try {
      const t = await WebUsbTransport.open(options);
      const client = new AdbClient(t, options, new MyKeyStore());

      const connInfo = await client.connect();
      const shellInstance = await client.interactiveShell((data: string) => {
        console.log("Shell output:", data);
        outputEmitter.current.emit("data", data);
      });

      setTransport(t);
      setAdbClient(client);
      setShell(shellInstance);
      setConnInfo(connInfo);
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
      setConnInfo(null);
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

  const pullFile = async (remotePath: string): Promise<Blob> => {
    if (!adbClient) {
      throw new Error("Shell is not connected");
    }

    return await adbClient.pull(remotePath);
  };

  const pushFile = async (blob: Blob, remotePath: string): Promise<void> => {
    if (!adbClient) {
      throw new Error("Shell is not connected");
    }

    return await adbClient.push(
      blob,
      remotePath,
      ADB_PUSH_FILE_PERMS,
      ADB_PUSH_CHUNK_SIZE
    );
  };

  return (
    <AdbContext.Provider
      value={{
        isSupported,
        adbClient,
        shell,
        transport,
        connInfo,
        subscribeOutput,
        connect,
        disconnect,
        sendCommand,
        pullFile,
        pushFile,
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
