import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import Web3 from "web3";
import Factory from "../contracts/Factory.json";
import "./Main.css";
import Logo from "../components/Logo";
||||||| merged common ancestors
=======
import { Button } from "semantic-ui-react";

import "./Main.css";
>>>>>>> Add sematic UI

<<<<<<< HEAD
const Main = () => {
  const [contracts, setContracts] = useState([]);
  const [object, setObject] = useState('');
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    const exec = async () => {
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("Failed to load `window.ethereum`.");
      }
      const accounts = await web3.eth.getAccounts();
      const factory = new web3.eth.Contract(
        Factory.abi,
        '0x2F312Dd912407C11AAb7488e261afd8fAEeE23EF'
      );
      const res = await factory.methods.getInstances().call();
      setContracts(res);
    };
    exec();
  }, []);

  const createContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const factory = new web3.eth.Contract(
      Factory.abi,
      '0x2F312Dd912407C11AAb7488e261afd8fAEeE23EF'
    );
    factory.methods.create(object).send({ from: accounts[0] });
  };

  return (
    <div className="Main">
      <Logo />
      <h1>Main view</h1>{" "}
      <div className="Contracts">
        <input
          className="Contract-input" placeholder="Object description"
          onChange={e => setObject(e.target.value)}
          value={object}
        />
        <button
          className="Contract-createBtn"
          onClick={() => createContract()}
        >Create contract</button>
        {contracts.map((contract) => (
          <div className="Contract">
            <span>Contract</span>
            <a href="#">{contract}</a>
          </div>
        ))}
      </div>
      <ul>
        <li>
          <Link to="/realtor">Realtor</Link>
        </li>
        <li>
          <Link to="/seller">Seller</Link>
        </li>
        <li>
          <Link to="/bank">Buyer's Bank</Link>
        </li>
        <li>
          <Link to="/coop">Co-op</Link>
        </li>
      </ul>
    </div>
  );
};
||||||| merged common ancestors
const Main = () => (
  <>
    <h1>Main view</h1>{" "}
    <ul>
      <li>
        <Link to="/realtor">Realtor</Link>
      </li>
      <li>
        <Link to="/seller">Seller</Link>
      </li>
      <li>
        <Link to="/bank">Bank</Link>
      </li>
    </ul>
  </>
);
=======
const Main = () => (
  <div className="Main--container">
    <h1>Choose a role</h1>
    <div className="Main--cuttonContainer">
      <Button>
        <Link to="/realtor">Realtor</Link>
      </Button>
      <Button>
        <Link to="/seller">Seller</Link>
      </Button>
      <Button>
        <Link to="/bank">Bank</Link>
      </Button>
    </div>
  </div>
);
>>>>>>> Add sematic UI

export default Main;
