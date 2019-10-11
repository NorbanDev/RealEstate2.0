import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import './Contract.scss';

export default function Contract(props) {
  let { contractAddr } = useParams();
  const [progress, setProgress] = useState(50);

  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Contract</h1>
        <span className="ContractPage-addr">{contractAddr}</span>
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
