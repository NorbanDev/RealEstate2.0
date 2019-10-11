import React, { useState, useEffect } from "react";
import Factory from "./contracts/Factory.json";
import HomeTransaction from "./contracts/HomeTransaction.json";
import Web3 from "web3";

import AppRouter from "./AppRouter.js";

import "./App.css";

const App = () => {
  const [state, setState] = useState({
    accounts: null,
    contracts: null,
    homeTransactions: null
  });
  useEffect(() => {
    const exec = async () => {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        console.error("FAIL");
      }
      const accounts = await web3.eth.getAccounts();
      const factory = new web3.eth.Contract(
        Factory.abi,
        "0x2F312Dd912407C11AAb7488e261afd8fAEeE23EF"
      );
      const contracts = await factory.methods.getInstances().call();
      const homeTransactions = contracts.map(
        contract => new web3.eth.Contract(HomeTransaction.abi, contract)
      );

      setState({ homeTransactions, accounts, contracts });
    };

    exec();
  }, []);

  const { accounts, contracts, homeTransactions } = state;

  return (
    <AppRouter
      account={accounts && accounts[0]}
      contracts={contracts}
      homeTransactions={homeTransactions}
    />
  );
};

export default App;
