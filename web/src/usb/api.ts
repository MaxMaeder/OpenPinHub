export interface USBDeviceInfo {
  id: string;
  vendorId: number;
  productId: number;
  productName?: string;
  serialNumber?: string;
}

export const usb = {
  list: (): Promise<USBDeviceInfo[]> => window.electronUSB.list(),
  open: (id: string): Promise<void> => window.electronUSB.open(id),
  onAdded: (cb: (d: USBDeviceInfo) => void) => {
    window.electronUSB.onAdded(cb);
  },
  onRemoved: (cb: (d: USBDeviceInfo) => void) => {
    window.electronUSB.onRemoved(cb);
  },
};

declare global {
  interface Window {
    electronUSB: any;
  }
}
