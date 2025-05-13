import { LoadingOverlay, Table } from "@mantine/core";
import { useState } from "react";
import { useUSBDevices } from "src/usb/useUsbDevices";

export const UsbSelectorModal = () => {
  const { devices, open: openDevice } = useUSBDevices();
  const [busy, setBusy] = useState<string | null>(null);

  const rows = devices.map((d) => (
    <tr
      key={d.id}
      onClick={() => {
        setBusy(d.id);
        openDevice(d.id)
          .then(() => console.log("done"))
          .finally(() => setBusy(null));
      }}
      style={{ cursor: "pointer" }}
    >
      <td>{d.productName ?? "Unknown"}</td>
      <td>{`0x${d.vendorId.toString(16)} : 0x${d.productId.toString(16)}`}</td>
      <td>{d.serialNumber ?? "–"}</td>
    </tr>
  ));

  return (
    <>
      <LoadingOverlay visible={!!busy} zIndex={1000} />
      <Table striped highlightOnHover withRowBorders={false}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vendor : Product</th>
            <th>Serial</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows
          ) : (
            <tr>
              <td colSpan={3}>No devices</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
