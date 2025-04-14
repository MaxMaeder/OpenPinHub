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

export const openConfirmRebootModal = () =>
  openConfirmModal(
    "Confirm Reboot",
    "Are you sure you want to reboot your Pin now?"
  );

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
