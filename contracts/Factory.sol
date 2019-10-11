pragma solidity >=0.4.25 <0.6.0;

import "./HomeTransaction.sol";

contract Factory {
  HomeTransaction[] contracts;

  function create(string memory _object, uint _price) public returns(HomeTransaction homeTransaction)  {
    homeTransaction = new HomeTransaction(_object, _price, msg.sender);
    
    contracts.push(homeTransaction);
  }

  function getInstance(uint index) public view returns (HomeTransaction instance) {
    require(index < contracts.length, "index out of range");

    instance = contracts[index];
  }

  function getInstances() public view returns (HomeTransaction[] memory instances) {
    instances = contracts;
  }

  function getInstanceCount() public view returns (uint count) {
    count = contracts.length;
  }
}
