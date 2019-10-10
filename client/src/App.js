import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import Web3 from 'web3';

import "./App.css";

const App = () => {
  const [, setState] = useState({ storageValue: 0, web3: null, accounts: null, contract: null });
  useEffect(() => {
    const exec = async () => {
      const web3 = new Web3(new Web3.providers.HttpProvider('rinkeby.infura.io/v3/495608570c2447a89fb8d76ad69b74dc'));
      console.dir(web3);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // setState({ web3, accounts, contract: instance });

      // runExample();
    };

    exec();
  });

  return (
    <div className="App">
      <h1>Norban Hackathon</h1>
      <p>Agreement, Smart Contract</p>
    </div>
  );
}

export default App;
