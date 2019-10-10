pragma solidity ^0.5.11;

contract HomeTransaction {
    address realtor = msg.sender;
    address payable seller;
    address buyer;
    
    function setSeller(address payable _seller) public {
        require(msg.sender == realtor, "Only realtor can set seller");
        seller = _seller;
    }
}