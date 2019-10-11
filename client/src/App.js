import React, { useState, useEffect } from "react";
import HomeTransaction from "./contracts/HomeTransaction.json";
import Web3 from "web3";

import "./App.css";
import AppRouter from "./AppRouter.js";

const App = () => {
  const [state, setState] = useState({
    accounts: null,
    contract: null,
    buyer: null,
    price: null,
    deposit: null,
    object: null
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
      const contract = new web3.eth.Contract(
        HomeTransaction.abi,
        "0x5af4dae68b0b28912da9955b3aa67246946bd9e7"
      );

      setState({ accounts, contract });
    };

    exec();
  }, []);

  const { accounts, contract } = state;

  return <AppRouter account={accounts && accounts[0]} contract={contract} />;
};

export default App;
