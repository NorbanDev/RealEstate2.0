import React from "react";
import { Link } from "react-router-dom";
import "./Bank.css";
import Logo from "../components/Logo";

const Bank = () => (
  <div className="Bank">
    <Logo />
    <Link to="/">← Back</Link>
    <h1>Buyer's Bank view</h1>
    <p>TODO</p>
    <p>• Bank sign the contract and stake the deposit.</p>
  </div>
);

export default Bank;
