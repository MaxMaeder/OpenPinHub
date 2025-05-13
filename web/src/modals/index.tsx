import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";

type AlertModalResult = {
  modalId: string;
  result: Promise<string>;
};

export const openAlertModal = (
  title: string,
  message: string
): AlertModalResult => {
  let resolveFn: (value: string) => void;

  const result = new Promise<string>((resolve) => {
    resolveFn = resolve;
  });

  const modalId = modals.openConfirmModal({
    title,
    children: <Text size="sm">{message}</Text>,
    labels: { confirm: "Ok", cancel: "Ok" },
    cancelProps: {
      display: "none",
    },
    onCancel: () => resolveFn("User acknowledged"),
    onConfirm: () => resolveFn("User acknowledged"),
  });

  return { modalId, result };
};

type ConfirmModalResult = {
  modalId: string;
  result: Promise<string>;
};

export const openConfirmModal = (
  title: string,
  message: string
): ConfirmModalResult => {
  let resolveFn: (value: string) => void;
  let rejectFn: (reason?: any) => void;

  const result = new Promise<string>((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  const modalId = modals.openConfirmModal({
    title,
    children: <Text size="sm">{message}</Text>,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => rejectFn("User canceled"),
    onConfirm: () => resolveFn("User confirmed"),
  });

  return { modalId, result };
};

export const openUsbSelectorModel = () =>
  modals.openContextModal({
    modal: "usbSelector",
    title: "Select USB",
    innerProps: {},
  });

export const openConfirmRebootModal = () =>
  openConfirmModal(
    "Confirm Reboot",
    "Are you sure you want to reboot your Pin now?"
  );

export const openDownloadModal = () =>
  modals.openContextModal({
    modal: "fileDownload",
    title: "Download File",
    innerProps: {},
  });
export const openUploadModal = () =>
  modals.openContextModal({
    modal: "fileUpload",
    title: "Upload File",
    innerProps: {},
  });
