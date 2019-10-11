import React from "react";
import JSONTree from "react-json-tree";

import "./Loading.scss";

const Loading = ({ web3error }) => {
  if (web3error) {
    return (
      <>
        <span>Error connecting to the ether network!</span>
        <span>
          <JSONTree data={web3error} />
        </span>
      </>
    );
  }

  return <span>Loading...</span>;
};

export default Loading;
