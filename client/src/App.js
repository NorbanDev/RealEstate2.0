import React, { useState, useEffect } from "react";

import AppRouter from "./AppRouter.js";
import { web3, factory, getAccount } from "./contracts";
import HomeTransaction from "./contracts/HomeTransaction";

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
      const contracts = await factory.methods.getInstances().call();

      setState({ account, contracts });
      const homeTransactions = contracts.map(
        contract => new web3.eth.Contract(HomeTransaction.abi, contract)
      );

      setState({ homeTransactions, account, contracts });
    };

    exec();
  }, []);

  const { account, homeTransactions } = state;

  return <AppRouter account={account} homeTransactions={homeTransactions} />;
};

export default App;
