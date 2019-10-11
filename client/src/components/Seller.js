import React, { useState, useEffect } from 'react';
import './Seller.scss';
import { getAccount } from '../contracts';

export default function Seller({ contractState, instance }) {
  const sellerSignContract = async () => {
    const account = await getAccount();
    instance.methods.sellerSignContract().send({ from: account });
  }

  return (
    <div className="Seller">
      {(contractState > 0) ? (
        <>
          <button onClick={() => sellerSignContract()}>Sign contract</button>
        </>
      ) : (
        <span>Signed, nothing else to do. ✨</span>
      )}
    </div>
  );
}
