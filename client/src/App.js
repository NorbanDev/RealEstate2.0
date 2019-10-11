import React, { useState, useEffect } from "react";

import AppRouter from "./AppRouter.js";
import { getAccount, getHomeTransactions } from "./contracts";

import "./App.css";

const App = () => {
  const [state, setState] = useState({
    account: null,
    homeTransactions: null
  });
  useEffect(() => {
    const exec = async () => {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        console.error("FAIL");
      }

      const account = await getAccount();
      const homeTransactions = await getHomeTransactions();

      setState({ homeTransactions, account });
    };

    exec();
  }, []);

  const { account, homeTransactions } = state;

  return <AppRouter account={account} homeTransactions={homeTransactions} />;
};

export default App;
