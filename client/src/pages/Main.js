import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import Logo from "../components/Logo";

const Main = () => (
  <div className="Main">
    <Logo />
    <h1>Main view</h1>{" "}
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

export default Main;
