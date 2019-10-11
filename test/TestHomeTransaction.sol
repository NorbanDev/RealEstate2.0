pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HomeTransaction.sol";
import "../contracts/Factory.sol";

contract TestHomeTransaction {
  uint public initialBalance = 1 ether;
  string constant testObject = "Villa vid havet";

  function testNormalFlow() public {
    Factory f = new Factory();
    HomeTransaction t = f.create(testObject, 100 wei);
    Assert.equal(f.getInstanceCount(), 1, "Expected factory to contain 1 contract");
    Assert.equal(t.object(), testObject, "Wrong object");
    t.sellerSignContract();
    Assert.equal(t.seller(), address(this), "Wrong seller");
    t.buyerSignContractAndPayDeposit.value(10 wei)();
    Assert.equal(t.buyer(), address(this), "Wrong buyer");
    t.buyerFinalizeTransaction.value(90 wei)();
    Assert.equal(t.finalized(), true, "Failed to finalize");
  }

  // this new function IS REQUIRED for the test to work
  function() external payable { }
}
