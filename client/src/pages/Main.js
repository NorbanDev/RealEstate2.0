import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
import Logo from "../components/Logo";
import { factory, getAccount } from "../contracts";
import ReactJson from "react-json-tree-view";

const Main = ({ homeTransactions }) => {
  const [object, setObject] = useState("");
  const [objects, setObjects] = useState([]);
  const [price, setPrice] = useState(0);

  const createContract = async () => {
    const from = await getAccount();
    factory.methods.create(object, price).send({ from });
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
      <h1 className="Contract-title">Contracts</h1>{" "}
      <div>
        <input
          className="Contract-input"
          placeholder="Object description"
          onChange={e => setObject(e.target.value)}
          value={object}
        />
        <input
          className="Contract-input"
          placeholder="Price"
          onChange={e => setPrice(e.target.value)}
          value={price}
        />
        <button className="Contract-createBtn" onClick={() => createContract()}>
          Create contract
        </button>
      </div>
      <div className="Contracts">
        {homeTransactions &&
          homeTransactions.map((homeTransaction, i) => (
            <Link to={`/${i}`} key={i}>
              <div className="Contract">
                <div className="Contract-content">
                  <div className="Contract-contentTitle">Contract {i}</div>
                  <span className="Contract-contentObject">{objects[i]}</span>
                </div>
                <span className="Contract-addr">
                  <ReactJson src={homeTransaction} />
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Main;
