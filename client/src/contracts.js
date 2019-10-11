import Web3 from "web3";
import Factory from "./contracts/Factory.json";
import HomeTransaction from "./contracts/HomeTransaction.json";

const web3 = new Web3(window.ethereum);

export const factory = new web3.eth.Contract(
  Factory.abi,
  "0x52bc4f7ad78dab3efc557738282573cf63be064f"
);

export const getAccount = async () => (await web3.eth.getAccounts())[0];

export const getHomeTransactions = async () =>
  (await factory.methods.getInstances().call()).map(
    contract => new web3.eth.Contract(HomeTransaction.abi, contract)
  );
