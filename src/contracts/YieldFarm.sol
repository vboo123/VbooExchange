pragma solidity ^0.5.0;

import "./VbooToken.sol";
import "./DaiToken.sol";

contract YieldFarm {
    //this contract will take in some Dai token and issue VetherToken
    string public name = "Vether Token Farm";
    address public admin; 

    VbooToken public vbooToken;
    DaiToken public daiToken;

    address[] public depositers; //keep track of all the stakers for our application
    //need to keep track so we can issue rewards later
    mapping(address => uint) public depositedBalance; //like a hash table
    mapping(address => bool) public hasDeposited; //if address is in this, user has staked
    mapping(address => bool) public isDepositing;

    constructor(VbooToken _vbooToken, DaiToken _daiToken) public {
        //whenever the smart contract is deployed to the network, this constructor is executed
        vbooToken = _vbooToken;
        daiToken = _daiToken;
        admin = msg.sender; //msg.sender is the person who deployed the contract in this case
    }

    //Deposit Tokens
    function depositTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "Must deposit at least 1 token");

        // Transfer Dai tokens to this contract for depositing
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Update the user depositing balance
        depositedBalance[msg.sender] = depositedBalance[msg.sender] + _amount;

        // if they have never deposited, add them to the depositers array
        if(hasDeposited[msg.sender] == false) {
            depositers.push(msg.sender);
        }
        // Update depositing status
        isDepositing[msg.sender] = true;
        hasDeposited[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unDepositTokens() public {
        // Fetch the deposited balance
        uint balance = depositedBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "deposited balance must be 0");

        // Transfer Mock Dai tokens to this contract to give back
        daiToken.transfer(msg.sender, balance);

        // Reset deposited balance
        depositedBalance[msg.sender] = 0;

        // Update depositing status
        isDepositing[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function to prevent anyone from issueTokens, only want the owner of contract to issue them
        require(msg.sender == admin, "caller must be the owner");

        // Issue tokens to all depositers, or essentially the interest that needs to be paid
        for (uint i=0; i<depositers.length; i++) {
            address recipient = depositers[i];
            uint balance = depositedBalance[recipient];
            if(balance > 0) {
                vbooToken.transfer(recipient, balance);
            }
        }
    }
}
