import React, { useState, useEffect } from 'react';
import './Seller.scss';
import { getAccount } from '../contracts';

export default function Seller({ sellerSigned, instance }) {
  const [signed, setState] = useState(sellerSigned);

  const sellerSignContract = async () => {
    const account = await getAccount();
    instance.methods.sellerSignContract().send({ from: account });
  }

  return (
    <div className="Seller">
      {(signed) ? (
        <>
          <button onClick={() => sellerSignContract()}>Sign contract</button>
        </>
      ) : (
        <span>Signed, nothing else to do. ✨</span>
      )}
    </div>
  );
}
