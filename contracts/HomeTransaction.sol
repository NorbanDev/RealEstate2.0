pragma solidity ^0.5.11;

contract HomeTransaction {
    address public realtor = msg.sender;

    // Set by realtor
    address payable public seller;
    uint public cost;

    // Set at deposit
    address public buyer;
    uint public deposit;
    
    function setSeller(address payable _seller, uint _cost) public {
        require(msg.sender == realtor, "Only realtor can set seller");
        require(seller == address(0) || buyer == address(0), "Cannot reset seller when there is a buyer");
        seller = _seller;
        cost = _cost;
    }
    
    function payDeposit() payable public {
        require(seller != address(0), "Realtor needs to set seller and cost first");
        require(buyer == address(0), "Contract already has a buyet");
        require(msg.value >= cost/10 && msg.value <= cost, "You have to deposit between 10% and 100%");
        
        buyer = msg.sender;
        deposit = msg.value;
    }
}