import React from "react";
import { Link } from "react-router-dom";
import "./Realtor.css";
import Logo from "../components/Logo";

const Realtor = () => (
  <div className="Realtor">
    <Logo />
    <Link to="/">← Back</Link>
    <h1>Realtor view</h1>
    <p>TODO</p>
    <p>• Make it possible for the Realtor to select contract</p>
    <p>• Show timeline</p>
  </div>
);

export default Realtor;
