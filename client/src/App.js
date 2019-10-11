import React, { useState, useEffect } from "react";
import Factory from "./contracts/Factory.json";
import HomeTransaction from "./contracts/HomeTransaction.json";
import Web3 from "web3";

import "./App.css";
import AppRouter from "./AppRouter.js";

const App = () => {
  const [contracts, setContracts] = useState([]);
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
<<<<<<< HEAD
=======
      const contract = new web3.eth.Contract(
        HomeTransaction.abi,
        "0x5af4dae68b0b28912da9955b3aa67246946bd9e7"
      );
>>>>>>> e6ae3bbf8eb9e76650786cdbe1c3c89fa07d9635

      const factory = new web3.eth.Contract(
        Factory.abi,
        '0x2F312Dd912407C11AAb7488e261afd8fAEeE23EF'
      );
      factory.methods.getInstances().call().then((res) => {
        setContracts(res);
      });
      
      setState({ accounts, contract });
    };

    exec();
  }, []);

  const { accounts, contract } = state;

  return <AppRouter account={accounts && accounts[0]} contract={contract} />;
};

export default App;
