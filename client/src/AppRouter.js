import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
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
      </Switch>
    </Router>
  );
};

export default AppRouter;
