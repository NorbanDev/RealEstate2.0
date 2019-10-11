pragma solidity >=0.4.25 <0.6.0;

contract HomeTransaction {
    // Constants
    uint constant timeBetweenDepositAndFinalization = 5 minutes;
    uint constant depositPercentage = 10;

    // Set at creation
    address public realtor;
    address public factory;
    string public homeAddress;
    string public zip;
    string public city;

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

    constructor(string memory _address, string memory _zip, string memory _city, uint _price, address _seller) public {
        realtor = _seller;
        factory = msg.sender;
        homeAddress = _address;
        zip = _zip;
        city = _city;
        price = _price;
    }

    function sellerSignContract() public {
        require(!sellerSigned, "Transaction already set up");

        assert(realtor != address(0));
        assert(!sellerSigned);
        assert(seller == address(0));
        assert(!buyerSigned);
        assert(buyer == address(0));
        assert(deposit == 0);
        assert(finalizeDeadline == 0);

        sellerSigned = true;

        seller = msg.sender;
    }

    function buyerSignContractAndPayDeposit() public payable {
        require(sellerSigned, "Cannot sign transaction before seller");
        require(!buyerSigned, "Cannot sign already signed transaction");

        require(buyer == address(0), "Contract already has a buyer");
        require(msg.value >= price*depositPercentage/100 && msg.value <= price, "Buyer needs to deposit between 10% and 100% to sign contract");

        assert(realtor != address(0));
        assert(sellerSigned);
        assert(seller != address(0));
        assert(!buyerSigned);
        assert(buyer == address(0));
        assert(deposit == 0);
        assert(finalizeDeadline == 0);

        buyerSigned = true;

        buyer = msg.sender;
        deposit = msg.value;
        finalizeDeadline = now + timeBetweenDepositAndFinalization;
    }

    function buyerFinalizeTransaction() public payable {
        require(buyerSigned, "Cannot finalize non-signed transaction");
        require(!finalized, "Cannot finalize already finalized transaction");

        require(buyer == msg.sender, "Only buyer can finalize transaction");
        require(msg.value + deposit == price, "Buyer needs to pay the rest of the cost to finalize transaction");

        assert(realtor != address(0));
        assert(sellerSigned);
        assert(seller != address(0));
        assert(buyerSigned);
        assert(buyer != address(0));
        assert(finalizeDeadline != 0);

        finalized = true;

        seller.transfer(price);
    }

    function anyWithdrawFromTransaction() public {
        require(buyerSigned, "Cannot withdraw from non-signed transaction");
        require(!finalized, "Cannot withdraw from already finalized transaction");

        require(buyer == msg.sender || finalizeDeadline <= now, "Only buyer can withdraw before transaction deadline");

        assert(realtor != address(0));
        assert(sellerSigned);
        assert(seller != address(0));
        assert(buyerSigned);
        assert(buyer != address(0));
        assert(finalizeDeadline != 0);

        finalized = true;

        seller.transfer(deposit);
    }
}
