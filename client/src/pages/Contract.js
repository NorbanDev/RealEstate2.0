import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from 'react-router-dom';
import cx from "classnames";
import "./Contract.scss";
import JSONTree from "react-json-tree";

const timeline = [
  { text: "Contract created" },
  { text: "Buyer approve contract" },
  { text: "Bank sign and deposit" },
  { text: "(Optional) Buy opt-out" },
  { text: "(Optional) After 5 min, everyone can opt-out" },
  { text: "Buyer finalize transaction" }
];

export default function Contract({ homeTransaction }) {
  const { index } = useParams();
  const [progress, setProgress] = useState(10);
  const [timelineProgress, setTimelineProgress] = useState(1);

  const updateProgress = (index) => {
    const percent = (index) / timeline.length;

    setProgress(Math.min(percent * 100, 100));
    setTimelineProgress(index);
  }

  useEffect(() => {
    (async () => {
      if (homeTransaction) {
        const sellerSigned = await homeTransaction.methods.sellerSigned().call();
        const buyerSigned = await homeTransaction.methods.buyerSigned().call();
        const finalized = await homeTransaction.methods.finalized().call();

        console.log(sellerSigned, buyerSigned, finalized);
      }
    })();
  }, [homeTransaction]);

  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Contract</h1>
        <span className="ContractPage-addr">{homeTransaction && homeTransaction.options.address}</span>

        <Route exact path="/:addr" render={() => (
          <div className="Contract-tabs">
            <Link to={`/${index}/buyer`}>Buyer</Link>
            <Link to={`/${index}/seller`}>Seller</Link>
          </div>
        )} />
        <Route path="/:addr/buyer" render={() => (
          <div>buyer!!!!</div>
        )} />
        <div className="Timeline">
          {timeline.map((point, i) => (
            <div
              className={cx("Timeline-point", {
                done: timelineProgress > i,
                "in-progress": timelineProgress === i
              })}
            >
              {i + 1}. {point.text}
            </div>
          ))}
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
