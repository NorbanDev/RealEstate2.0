import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Realtor from "./pages/Realtor";
import Seller from "./pages/Seller";
import Bank from "./pages/Bank";
import Coop from "./pages/Coop";
import Contract from "./pages/Contract";

const AppRouter = ({ account, homeTransactions }) => (
  <Router>
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Main homeTransactions={homeTransactions} />}
      />
      <Route
        path="/:index"
        render={({
          match: {
            params: { index }
          }
        }) => <Contract homeTransaction={homeTransactions && homeTransactions[index]} />}
      />
      <Route path="/realtor" component={Realtor} />
      <Route path="/seller" render={() => <Seller account={account} />} />
      <Route path="/bank" component={Bank} />
      <Route path="/coop" component={Coop} />
    </Switch>
  </Router>
);

export default AppRouter;
