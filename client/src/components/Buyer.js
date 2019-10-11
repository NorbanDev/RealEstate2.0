import React, { useState, useEffect } from "react";
import "./Buyer.scss";
import Button from "./Button";
import { getAccount } from "../contracts";
import Web3 from "web3";

const Buyer = ({ homeTransaction, buyerSigned }) => {
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
    console.dir(homeTransaction);
    const from = await getAccount();
    homeTransaction.methods
      .buyerSignContractAndPayDeposit()
      .send({ from, value: pricing.deposit });
  };
  console.dir(buyerSigned);
  return (
    <div className="Buyer">
      {buyerSigned == null && <p>Loading...</p>}
      {buyerSigned != null && !buyerSigned && (
        <>
          <p>Sign contract and pay deposit</p>
          <div>
            <Button className="Buyer-signBtn" onClick={() => sign()}>
              Sign
            </Button>
          </div>
        </>
      )}
      {buyerSigned != null && buyerSigned && <p>Deposit is payed</p>}
      <p>price: {pricing.price || "-"}</p>
      <p>deposit: {pricing.deposit || "-"}</p>
    </div>
  );
};

export default Buyer;
