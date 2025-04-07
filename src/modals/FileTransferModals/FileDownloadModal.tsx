import { ContextModalProps } from "@mantine/modals";
import TransferForm, { TransferFormHandler } from "./TransferForm";
import { useAdb } from "../../context/AdbProvider";
import { useEffect } from "react";
import { saveAs } from "file-saver";

const FileDownloadModal = ({ context, id }: ContextModalProps) => {
  const { connInfo, pullFile } = useAdb();

  // Close model if device disconnected
  useEffect(() => {
    if (!connInfo) context.closeModal(id);
  }, [connInfo]);

  const handleFileDownload: TransferFormHandler = async (data, setError) => {
    try {
      const fileName = data.path.split("/").pop();
      const fileBlob = await pullFile(data.path);

      saveAs(fileBlob, fileName);

      setError(null);
      context.closeModal(id);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return <TransferForm mode="download" onSubmit={handleFileDownload} />;
};

export default FileDownloadModal;
