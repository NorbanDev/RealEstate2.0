pragma solidity ^0.5.11;

contract HomeTransaction {
    address public realtor = msg.sender;

    // Set by realtor
    address payable public seller;
    uint public cost;

    // Set at deposit
    address public buyer;
    uint public deposit;
    bool public finalized = false;
    
    function realtorSetupContract(address payable _seller, uint _cost) public {
        require(msg.sender == realtor, "Only realtor can set seller");
        require(seller == address(0), "Seller already set");
        
        seller = _seller;
        cost = _cost;
    }
    
    function buyerSignContract() payable public {
        require(seller != address(0), "Realtor needs to set seller and cost first");
        require(buyer == address(0), "Contract already has a buyer");
        require(msg.value >= cost/10 && msg.value <= cost, "Buyer needs to deposit between 10% and 100% to sign contract");
        
        buyer = msg.sender;
        deposit = msg.value;
    }
    
    function buyerFinalizeTransaction() payable public {
        require(buyer == msg.sender, "Only buyer can finalize transaction");
        require(msg.value + deposit == cost, "Buyer needs to pay the rest of the cost to finalize transaction");
        require(!finalized, "Cannot finalize already finalized transaction");
        
        finalized = true;
        seller.transfer(cost);
    }
}