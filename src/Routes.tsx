import OpenPin from "./routes/about/OpenPin";
import Interposers from "./routes/about/Interposers";
import Community from "./routes/about/Community";
import Installers from "./routes/installers/Installers";
import Settings from "./routes/Settings";
import InstallerDetails from "./routes/installers/InstallerDetails";
import { Redirect, Route, Switch } from "wouter";
import Console from "./routes/Console";
import RunAction from "./routes/installers/RunAction";
import NotFound from "./components/NotFound";

const Routes = () => (
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
    <Route path="/installers" nest>
      <Switch>
        <Route path="/">
          <Installers />
        </Route>
        <Route path="/:owner/:repo" nest>
          <Switch>
            <Route path="/:release/:action">
              <RunAction />
            </Route>
            <Route path="/">
              <InstallerDetails />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Route>
    <Route path="/console">
      <Console />
    </Route>
    <Route path="/settings">
      <Settings />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Routes;
