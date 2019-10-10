pragma solidity ^0.5.8;

contract HomeTransaction {
    // Constants
    uint constant timeBetweenDepositAndFinalization = 5 minutes;
    
    // Set at creation
    address public realtor = msg.sender;
    string public object;

    // Set by realtor
    bool public sellerSigned = false;
    address payable public seller;
    uint public price;

    // Set at deposit
    bool public buyerSigned = false;
    address public buyer;
    uint public deposit;
    uint public finalizeDeadline;
    
    // Set at finalize
    bool public finalized = false;
    
    constructor(string memory _object) public {
        object = _object;
    }
    
    function sellerSignContract(uint _price) public {
        require(!sellerSigned, "Transaction already set up");

        seller = msg.sender;
        price = _price;
        
        sellerSigned = true;
    }
    
    function buyerSignContractAndPayDeposit() public payable {
        require(sellerSigned, "Cannot sign transaction before seller");
        require(!buyerSigned, "Cannot sign already signed transaction");
        
        require(buyer == address(0), "Contract already has a buyer");
        require(msg.value >= price/10 && msg.value <= price, "Buyer needs to deposit between 10% and 100% to sign contract");
        
        buyer = msg.sender;
        deposit = msg.value;
        finalizeDeadline = now + timeBetweenDepositAndFinalization;
        
        buyerSigned = true;
    }
    
    function buyerFinalizeTransaction() public payable {
        require(buyerSigned, "Cannot finalize non-signed transaction");
        require(!finalized, "Cannot finalize already finalized transaction");
        
        require(buyer == msg.sender, "Only buyer can finalize transaction");
        require(msg.value + deposit == price, "Buyer needs to pay the rest of the cost to finalize transaction");
        
        seller.transfer(price);
        
        finalized = true;
    }
   
    
    function anyWithdrawFromTransaction() public {
        require(buyerSigned, "Cannot withdraw from non-signed transaction");
        require(!finalized, "Cannot withdraw from already finalized transaction");

        require(buyer == msg.sender || finalizeDeadline <= now, "Only buyer can withdraw before transaction deadline");
        
        seller.transfer(deposit);
        
        finalized = true;
    }
}