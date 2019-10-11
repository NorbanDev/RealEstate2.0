pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/HomeTransaction.sol";
import "../contracts/Factory.sol";

contract TestHomeTransaction {
  uint public initialBalance = 1 ether;
  string constant testAddress = "Villa vid havet 10";
  string constant testZip = "123 45";
  string constant testCity = "Havshult";

  function testNormalFlow() public {
    Factory f = new Factory();
    HomeTransaction t = f.create(
      testAddress,
      testZip,
      testCity,
      5 wei,
      100 wei,
      address(this),
      address(this));
    Assert.equal(f.getInstanceCount(), 1, "Expected factory to contain 1 contract");
    Assert.equal(t.homeAddress(), testAddress, "Wrong address");
    Assert.equal(t.zip(), testZip, "Wrong zip");
    Assert.equal(t.city(), testCity, "Wrong city");
    t.sellerSignContract();
    Assert.equal(t.seller(), address(this), "Wrong seller");
    t.buyerSignContractAndPayDeposit.value(10 wei)();
    Assert.equal(t.buyer(), address(this), "Wrong buyer");
    t.realtorReviewedClosingConditions(true);
    t.buyerFinalizeTransaction.value(90 wei)();
    Assert.equal(true, t.contractState() == HomeTransaction.ContractState.Finalized, "Failed to finalize");
  }

  // this new function IS REQUIRED for the test to work
  function() external payable { }
}
