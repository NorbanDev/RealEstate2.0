import React from "react";
import { Link } from "react-router-dom";

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

export default Main;
