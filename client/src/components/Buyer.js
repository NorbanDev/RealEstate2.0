import React, { useState, useEffect } from "react";
import "./Buyer.scss";
import Button from "./Button";
import { getAccount } from "../contracts";

const Buyer = ({ homeTransaction, contractState }) => {
  const [pricing, setPricing] = useState({});
  useEffect(() => {
    (async () => {
      if (homeTransaction) {
        const price = await homeTransaction.methods.price().call();

        setPricing({ price, deposit: price / 10 });
      }
    })();
  }, [homeTransaction]);
  const sign = async () => {
    const from = await getAccount();
    homeTransaction.methods
      .buyerSignContractAndPayDeposit()
      .send({ from, value: pricing.deposit });
  };
  const finalize = async () => {
    const from = await getAccount();
    homeTransaction.methods.buyerFinalizeTransaction().send({ from });
  };
  return (
    <div className="Buyer">
      {contractState == null && <p>Loading...</p>}
      {contractState != null && contractState === 1 && (
        <>
          <p>Sign contract and pay deposit</p>
          <div>
            <Button className="Buyer-signBtn" onClick={() => sign()}>
              Sign
            </Button>
          </div>
        </>
      )}
      {contractState != null && contractState === 3 && (
        <>
          <p>Finalize</p>
          <div>
            <Button className="Buyer-signBtn" onClick={() => finalize()}>
              Finalize
            </Button>
          </div>
        </>
      )}
      {contractState != null && contractState > 1 && <p>Deposit is payed</p>}
      <p>price: {pricing.price || "-"}</p>
      <p>deposit: {pricing.deposit || "-"}</p>
    </div>
  );
};

export default Buyer;
