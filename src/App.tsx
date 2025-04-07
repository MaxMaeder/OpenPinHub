import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { AdbProvider } from "./context/AdbProvider";

import "xterm/css/xterm.css";
import AppLayout from "./layouts/AppLayout";
import { Route, Switch } from "wouter";
import Console from "./routes/Console";

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AdbProvider>
        <AppLayout>
          <Switch>
            <Route path="/">Hi!</Route>
            <Route path="/console">
              <Console />
            </Route>
          </Switch>
        </AppLayout>
      </AdbProvider>
    </MantineProvider>
  );
}
