import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import cx from 'classnames';
import './Contract.scss';

const timeline = [
  { text: 'Contract created' },
  { text: 'Buyer approve contract' },
  { text: 'Bank sign and deposit' },
  { text: '(Optional) Buy opt-out' },
  { text: '(Optional) After 5 min, everyone can opt-out' },
  { text: 'Buyer finalize transaction' },
];

export default function Contract(props) {
  let { contractAddr } = useParams();
  const [progress, setProgress] = useState(50);
  const [timelineProgress, setTimelineProgress] = useState(1);

  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Contract</h1>
        <span className="ContractPage-addr">{contractAddr}</span>
        <div className="Timeline">
          {timeline.map((point, i) => (
            <div
              className={cx('Timeline-point', {
                done: timelineProgress > i,
                'in-progress': timelineProgress == i,
              })}
            >{i + 1}. {point.text}</div>
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
