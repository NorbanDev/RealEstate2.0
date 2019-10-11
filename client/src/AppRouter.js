import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Seller from "./pages/Seller";
import Buyer from "./pages/Buyer";
import Coop from "./pages/Coop";
import Contract from "./pages/Contract";
import Loading from "./pages/Loading";

const AppRouter = ({ account, homeTransactions, web3error }) => {
  if (!account || !homeTransactions) {
    return <Loading web3error={web3error} />;
  }

  return (
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
          }) => (
            <Contract
              homeTransaction={homeTransactions && homeTransactions[index]}
            />
          )}
        />
        <Route path="/seller" render={() => <Seller account={account} />} />
        <Route path="/buyer" component={Buyer} />
        <Route path="/coop" component={Coop} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
