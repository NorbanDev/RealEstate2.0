import React, { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Factory from "../contracts/Factory.json";
import "./Main.scss";
import Logo from "../components/Logo";

const Main = ({ contracts }) => {
  const [object, setObject] = useState("");
  const web3 = new Web3(window.ethereum);

  const createContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const factory = new web3.eth.Contract(
      Factory.abi,
      "0x2F312Dd912407C11AAb7488e261afd8fAEeE23EF"
    );
    factory.methods.create(object).send({ from: accounts[0] });
  };

  return (
    <div className="Main">
      <Logo />
      <h1 className="Contract-title">Contracts</h1>{" "}
      <div>
        <input
          className="Contract-input"
          placeholder="Object description"
          onChange={e => setObject(e.target.value)}
          value={object}
        />
        <button className="Contract-createBtn" onClick={() => createContract()}>
          Create contract
        </button>
      </div>
      <div className="Contracts">
        {contracts &&
          contracts.map((contract, i) => (
            <Link to={contract} key={contract}>
              <div className="Contract">
                <div className="Contract-content">
                  <div>Contract {i}</div>
                  <span>Contract description</span>
                </div>
                <span className="Contract-addr">{contract}</span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Main;
