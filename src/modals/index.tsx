import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export const openConfirmModal = (title: string, message: string) => {
  return new Promise((resolve, reject) => {
    modals.openConfirmModal({
      title,
      children: <Text size="sm">{message}</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => reject("User canceled"),
      onConfirm: () => resolve("User confirmed"),
    });
  });
};

export const openDownloadModal = () => {
  modals.openContextModal({
    modal: "fileDownload",
    title: "Download File",
    innerProps: {},
  });
};

export const openUploadModal = () => {
  modals.openContextModal({
    modal: "fileUpload",
    title: "Upload File",
    innerProps: {},
  });
};
