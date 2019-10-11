import React from "react";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => (
  <div className="Main">
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
  </div>
);

export default Main;
