import React from "react";
import "./Buyer.scss";
import Button from "./Button";

const Buyer = () => {
  const sign = () => {};
  return (
    <div className="Buyer">
      Sign sum
      <Button className="Buyer-signBtn" onClick={() => sign()}>
        Create contract
      </Button>
    </div>
  );
};

export default Buyer;
