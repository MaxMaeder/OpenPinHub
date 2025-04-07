import { ContextModalProps } from "@mantine/modals";
import TransferForm, { FileFormData } from "./TransferForm";
import { useAdb } from "../../context/AdbProvider";
import { useEffect } from "react";

const FileUploadModal = ({ context, id }: ContextModalProps) => {
  const { connInfo, pushFile } = useAdb();

  // Close model if device disconnected
  useEffect(() => {
    if (!connInfo) context.closeModal(id);
  }, [connInfo]);

  const handleFileUpload = async (data: FileFormData) => {
    if (!data.file) throw new Error("No file specified!");
    await pushFile(data.file, data.path);
    context.closeModal(id);
  };

  return <TransferForm mode="upload" onSubmit={handleFileUpload} />;
};

export default FileUploadModal;
