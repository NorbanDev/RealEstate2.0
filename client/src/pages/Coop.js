import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import "./Coop.css";

const Coop = () => (
  <div className="Coop">
    <Logo />
    <Link to="/">← Back</Link>
    <h1>Co-op's view</h1>
  </div>
);

export default Coop;
