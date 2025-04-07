import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { AdbProvider } from "./context/AdbProvider";

import "xterm/css/xterm.css";
import AppLayout from "./layouts/AppLayout";
import { Route, Switch } from "wouter";
import Console from "./routes/Console";
import { ModalsProvider } from "@mantine/modals";
import FileUploadModal from "./modals/FileTransferModals/FileUploadModal";
import FileDownloadModal from "./modals/FileTransferModals/FileDownloadModal";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AdbProvider>
        <ModalsProvider
          modals={{
            fileUpload: FileUploadModal,
            fileDownload: FileDownloadModal,
          }}
        >
          <AppLayout>
            <Switch>
              <Route path="/">Hi!</Route>
              <Route path="/console">
                <Console />
              </Route>
            </Switch>
          </AppLayout>
        </ModalsProvider>
      </AdbProvider>
    </MantineProvider>
  );
}
