import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Factory from "../contracts/Factory.json";
import "./Main.scss";
import Logo from "../components/Logo";

const Main = ({ contracts, homeTransactions }) => {
  const [home, setHome] = useState({});
  const [objects, setObjects] = useState("");
  const web3 = new Web3(window.ethereum);

  const createContract = async () => {
    const accounts = await web3.eth.getAccounts();
    const factory = new web3.eth.Contract(
      Factory.abi,
      "0x2F312Dd912407C11AAb7488e261afd8fAEeE23EF"
    );
    factory.methods
      .create(home.address, home.zip, home.city)
      .send({ from: accounts[0] });
  };

  useEffect(() => {
    if (!homeTransactions) {
      return;
    }
    (async () => {
      const promises = homeTransactions.map(homeTransaction =>
        homeTransaction.methods.object().call()
      );
      const loadedObjects = await Promise.all(promises);
      setObjects(loadedObjects);
    })();
  }, [homeTransactions]);

  return (
    <div className="Main">
      <Logo />
      <h1 className="Main-title">Contracts</h1>{" "}
      <div>
        <p>Enter the home details for the contract</p>
        <div class="Contract-form">
          <input
            className="Contract-formInput"
            placeholder="Address"
            onChange={e => setHome({ address: e.target.value })}
            value={home.address}
          />
          <input
            className="Contract-formInput"
            placeholder="Zip"
            onChange={e => setHome({ zip: e.target.value })}
            value={home.zip}
          />
          <input
            className="Contract-formInput"
            placeholder="City"
            onChange={e => setHome({ city: e.target.value })}
            value={home.city}
          />
        </div>
        <p>{home.address}</p>
        <button className="Contract-createBtn" onClick={() => createContract()}>
          Create contract
        </button>
      </div>
      <div className="Contracts">
        {contracts &&
          contracts.map((contract, i) => (
            <Link to={`/${i}`} key={i}>
              <div className="Contract">
                <div className="Contract-content">
                  <div className="Contract-contentTitle">Contract {i}</div>
                  <span className="Contract-contentObject">{objects[i]}</span>
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
