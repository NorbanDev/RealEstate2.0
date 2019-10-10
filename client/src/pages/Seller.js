import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Seller.css";

const Seller = ({ account, contract }) => {
  const [state, setState] = useState({ price: null });

  useEffect(() => {
    (async () => {
      const price = contract && (await contract.methods.price().call());
      setState({ price });
    })();
  }, [contract]);
  return (
    <div className="Seller">
      <Link to="/">← Back</Link>
      <h1>Seller view</h1>
      <button
        onClick={async () => {
          console.dir(account);
          console.dir(contract);
          const femMillar = 5 * 1000 * 1000;
          try {
            await contract.methods
              .sellerSignContract(femMillar)
              .send({ from: account });
          } catch (e) {
            console.error(e);
          }
        }}
      >
        sign
      </button>
      <p>price: {state.price}</p>
    </div>
  );
};

export default Seller;
