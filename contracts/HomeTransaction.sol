pragma solidity ^0.5.11;

contract HomeTransaction {
    // Constants
    uint constant timeBetweenDepositAndFinalization = 5 minutes;
    
    // Set at creation
    address public realtor = msg.sender;

    // Set by realtor
    bool public setup = false;
    address payable public seller;
    uint public cost;

    // Set at deposit
    bool public signed = false;
    address public buyer;
    uint public deposit;
    uint public finazeByTimestamp;
    
    // Set at finalize
    bool public done = false;
    
    function realtorSetupContract(address payable _seller, uint _cost) public {
        require(msg.sender == realtor, "Only realtor can set seller");
        require(!setup, "Transaction already set up");
        
        seller = _seller;
        cost = _cost;
        
        setup = true;
    }
    
    function buyerSignContractAndPayDeposit() payable public {
        require(!setup, "Realtor needs to set seller and cost first");
        
        require(buyer == address(0), "Contract already has a buyer");
        require(msg.value >= cost/10 && msg.value <= cost, "Buyer needs to deposit between 10% and 100% to sign contract");
        
        buyer = msg.sender;
        deposit = msg.value;
        finazeByTimestamp = now + timeBetweenDepositAndFinalization;
        
        signed = true;
    }
    
    function buyerFinalizeTransaction() payable public {
        require(!done, "Cannot finalize already finalized transaction");
        
        require(buyer == msg.sender, "Only buyer can finalize transaction");
        require(msg.value + deposit == cost, "Buyer needs to pay the rest of the cost to finalize transaction");
        
        
        seller.transfer(cost);
        
        done = true;
    }
    
    function buyerWithdrawAndLoseDeposit() public {
        require(!done, "Cannot withdraw already finalized transaction");
        
        require(buyer == msg.sender, "Only buyer can withdraw before transaction deadline");
        
        seller.transfer(deposit);
        
        done = true;
    }
    
    function realtorWithdrawAfterDeadline() public {
        require(!done, "Cannot withdraw already finalized transaction");
        
        require(realtor == msg.sender, "Only realtor can withdraw after transaction deadline");
        require(deadline <= now, "Realtor cannot withdraw before deadline");

        seller.transfer(deposit);
        
        done = true;
    }
}