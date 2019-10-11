import Web3 from "web3";
import Factory from "./contracts/Factory.json";

export const web3 = new Web3(window.ethereum);

export const factory = new web3.eth.Contract(
  Factory.abi,
  "0x0ec9f307A694a90dC16Bc3601A618063696158F2"
);
