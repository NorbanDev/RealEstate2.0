pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HomeTransaction.sol";

contract TestHomeTransaction {
  uint public initialBalance = 1 ether;
  string constant testObject = "Villa vid havet";

  function testNormalFlow() public {
    HomeTransaction t = new HomeTransaction(testObject);
    Assert.equal(t.object(), testObject, "Wrong object");
    t.sellerSignContract(100 wei);
    Assert.equal(t.seller(), address(this), "Wrong seller");
    t.buyerSignContractAndPayDeposit.value(10 wei).gas(100000 wei)();
    Assert.equal(t.buyer(), address(this), "Wrong buyer");
    t.buyerFinalizeTransaction.value(90 wei).gas(100000 wei)();
    Assert.equal(t.finalized(), true, "Failed to finalize");
  }

  // this new function IS REQUIRED for the test to work
  function() external payable { }
}
