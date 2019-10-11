pragma solidity >=0.4.25 <0.6.0;

import "./HomeTransaction.sol";

contract Factory {
  address[] contracts;

  function create(string memory _address, string memory _zip, string memory _city, ) public {
    contracts.push(address(new HomeTransaction(_address, _zip, _city, msg.sender)));
  }

  function getInstance(uint index) public view returns (address instance) {
    require(index < contracts.length, "index out of range");

    instance = contracts[index];
  }

  function getInstances() public view returns (address[] memory instances) {
    instances = contracts;
  }

  function getInstanceCount() public view returns (uint count) {
    count = contracts.length;
  }
}
