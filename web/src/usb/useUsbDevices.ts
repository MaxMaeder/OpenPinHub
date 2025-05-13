import { useEffect, useState } from "react";
import { usb, USBDeviceInfo } from "./api";

export function useUSBDevices() {
  const [devices, setDevices] = useState<USBDeviceInfo[]>([]);

  useEffect(() => {
    usb.list().then(setDevices);
    const add = (d: USBDeviceInfo) => setDevices((prev) => [...prev, d]);
    const rem = (d: USBDeviceInfo) =>
      setDevices((prev) => prev.filter((p) => p.id !== d.id));
    usb.onAdded(add);
    usb.onRemoved(rem);
    return () => {
      /* listeners auto-removed by GC in this simple bridge */
    };
  }, []);

  return { devices, open: usb.open };
}
