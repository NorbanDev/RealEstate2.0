import React from "react";
import "./Coop.scss";
import Button from "./Button";
import { getAccount } from "../contracts";

const Coop = ({ homeTransaction, contractState }) => {
  console.dir(contractState);
  const confirm = async approved => {
    const from = await getAccount();
    homeTransaction.methods
      .realtorReviewedClosingConditions()
      .send({ from, value: approved });
  };
  return (
    <div className="Coop">
      {contractState == null && <p>Loading...</p>}
      {contractState != null && contractState === 2 && (
        <>
          <p>Approve buyer</p>
          <div>
            <Button className="Coop-signBtn" onClick={() => confirm(true)}>
              Approve
            </Button>
            <Button className="Coop-signBtn" onClick={() => confirm(false)}>
              Decline
            </Button>
          </div>
        </>
      )}
      {contractState != null && contractState > 2 && <p>Buyer is confirmed</p>}
    </div>
  );
};

export default Coop;
