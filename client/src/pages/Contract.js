import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import cx from "classnames";
import "./Contract.scss";
import JSONTree from "react-json-tree";
import Seller from "../components/Seller";
import Buyer from "../components/Buyer";
import Coop from "../components/Coop";

const timeline = [
  { text: "Contract created" },
  { text: "Seller sign contract" },
  { text: "Buyer sign and deposit to contract" },
  { text: "Realtor sign contract" },
  { text: "Buyer finalize transaction" }
];

export default function Contract({ homeTransaction }) {
  const { index } = useParams();
  const [progress, setProgress] = useState(10);
  const [contractState, setContractState] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(1);

  const updateProgress = index => {
    const percent = index / timeline.length;

    setProgress(Math.min(percent * 100, 100));
    setTimelineProgress(index);
  };

  useEffect(() => {
    (async () => {
      if (homeTransaction) {
        const res = await homeTransaction.methods.contractState().call();
        setContractState(res);
      }
    })();
  }, [homeTransaction]);

  useEffect(() => {
    updateProgress(parseInt(contractState, 10) + 1);
  }, [contractState]);

  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Contract</h1>
        <span className="ContractPage-addr">
          {homeTransaction && homeTransaction.options.address}
        </span>
        <Route
          exact
          path="/:addr"
          render={() => (
            <div className="Contract-tabs">
              <Link to={`/${index}/buyer`}>Buyer</Link>
              <Link to={`/${index}/seller`}>Seller</Link>
              <Link to={`/${index}/coop`}>Co-op</Link>
            </div>
          )}
        />
        <Route
          path="/:addr/buyer"
          render={() => (
            <Buyer
              homeTransaction={homeTransaction}
              contractState={contractState}
            />
          )}
        />
        <Route
          path="/:addr/seller"
          render={() => (
            <Seller contractState={contractState} instance={homeTransaction} />
          )}
        />
        <Route
          path="/:addr/coop"
          render={() => (
            <Coop
              contractState={contractState}
              homeTransaction={homeTransaction}
            />
          )}
        />
        <div className="Timeline">
          {timeline.map((point, i) => (
            <div
              className={cx("Timeline-point", {
                done: timelineProgress > i,
                "in-progress": timelineProgress === i,
                reject: contractState === 5
              })}
            >
              {i + 1}. {point.text}
            </div>
          ))}
          {contractState === 5 && (
            <div className={cx("Timeline-point failed")}>
              Contract rejected.
            </div>
          )}
        </div>
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
