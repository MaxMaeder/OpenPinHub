import { modals } from "@mantine/modals";

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
