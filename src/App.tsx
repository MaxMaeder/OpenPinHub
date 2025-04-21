import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { AdbProvider } from "./context/AdbProvider";
import AppLayout from "./layouts/AppLayout";
import { ModalsProvider } from "@mantine/modals";
import FileUploadModal from "./modals/FileTransferModals/FileUploadModal";
import FileDownloadModal from "./modals/FileTransferModals/FileDownloadModal";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/query";
import Routes from "./Routes";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <AdbProvider>
          <ModalsProvider
            modals={{
              fileUpload: FileUploadModal,
              fileDownload: FileDownloadModal,
            }}
          >
            <AppLayout>
              <Routes />
            </AppLayout>
          </ModalsProvider>
        </AdbProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
