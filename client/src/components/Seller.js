import React from 'react';
import './Seller.scss';
import { getAccount } from '../contracts';

export default function Seller({ sellerSigned, instance }) {
  const sellerSignContract = async () => {
    const account = await getAccount();
    instance.methods.sellerSignContract().send({ from: account });
  }

  return (
    <div className="Seller">
      <div>.:Seller:.</div>
      <button onClick={() => sellerSignContract()}>Sign contract</button>
    </div>
  );
}
