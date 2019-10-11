import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Realtor from "./pages/Realtor";
import Seller from "./pages/Seller";
import Bank from "./pages/Bank";
import Coop from "./pages/Coop";
import Contract from "./pages/Contract";

const AppRouter = ({ account, contracts, homeTransactions }) => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Main contracts={contracts} homeTransactions={homeTransactions} />
        )}
      />
      <Route path="/:contractAddr" children={<Contract />} />
      <Route path="/realtor" component={Realtor} />
      <Route
        path="/seller"
        render={() => <Seller account={account} contracts={contracts} />}
      />
      <Route path="/bank" component={Bank} />
      <Route path="/coop" component={Coop} />
    </Switch>
  </Router>
);

export default AppRouter;
