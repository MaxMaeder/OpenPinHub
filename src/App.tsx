import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { AdbProvider } from "./context/AdbProvider";

import "xterm/css/xterm.css";
import AppLayout from "./layouts/AppLayout";
import { Redirect, Route, Switch } from "wouter";
import Console from "./routes/Console";
import { ModalsProvider } from "@mantine/modals";
import FileUploadModal from "./modals/FileTransferModals/FileUploadModal";
import FileDownloadModal from "./modals/FileTransferModals/FileDownloadModal";
import OpenPin from "./routes/about/OpenPin";
import Interposers from "./routes/about/Interposers";
import Community from "./routes/about/Community";

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
              <Route path="/">
                <Redirect to="/about/openpin" />
              </Route>
              <Route path="/about" nest>
                <Switch>
                  <Route path="/openpin">
                    <OpenPin />
                  </Route>
                  <Route path="/interposers">
                    <Interposers />
                  </Route>
                  <Route path="/community">
                    <Community />
                  </Route>
                  <Route>
                    <Redirect to="/openpin" />
                  </Route>
                </Switch>
              </Route>
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
