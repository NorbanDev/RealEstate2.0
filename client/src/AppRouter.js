import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Realtor from "./pages/Realtor";
import Seller from "./pages/Seller";
import Bank from "./pages/Bank";
import Coop from "./pages/Coop";

const AppRouter = ({ account, contract }) => (
  <Router>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/realtor" component={Realtor} />
      <Route
        path="/seller"
        render={() => <Seller account={account} contract={contract} />}
      />
      <Route path="/bank" component={Bank} />
      <Route path="/coop" component={Coop} />
    </Switch>
  </Router>
);

export default AppRouter;
