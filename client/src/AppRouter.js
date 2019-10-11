import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Seller from "./pages/Seller";
import Buyer from "./pages/Buyer";
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
        }) => <Contract homeTransaction={homeTransactions[index]} />}
      />
      <Route path="/seller" render={() => <Seller account={account} />} />
      <Route path="/buyer" component={Buyer} />
      <Route path="/coop" component={Coop} />
    </Switch>
  </Router>
);

export default AppRouter;
