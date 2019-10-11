import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Contract.scss";

export default function Contract({ contracts, homeTransactions }) {
  const { index } = useParams();
  const [progress, setProgress] = useState(50);
  const contract = contracts[index];
  // const homeTransaction = homeTransactions[index];

  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Contract</h1>
        <span className="ContractPage-addr">{contract}</span>
        <div className="ProgressBar-container">
          <div className="ProgressBar-background"></div>
          <div
            className="ProgressBar-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
