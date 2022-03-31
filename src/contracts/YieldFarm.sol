pragma solidity ^0.5.0;

import "./VetherToken.sol";
import "./DaiToken.sol";

contract YieldFarm {
    //this contract will take in some Dai token and issue VetherToken
    string public name = "Vether Token Farm";
    address public owner;

    VetherToken public dappToken;
    DaiToken public daiToken;

    address[] public stakers; //keep track of all the stakers for our application
    //need to keep track so we can issue rewards later
    mapping(address => uint) public depositedBalance; //like a hash table
    mapping(address => bool) public hasDeposited; //if address is in this, user has staked
    mapping(address => bool) public isDepositing;

    constructor(VetherToken _vetherToken, DaiToken _daiToken) public {
        //whenever the smart contract is deployed to the network, this constructor is executed
        dappToken = _vetherToken;
        daiToken = _daiToken;
        owner = msg.sender;
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
            stakers.push(msg.sender);
        }
        // Update depositing status
        isDepositing[msg.sender] = true;
        hasDeposited[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Mock Dai tokens to this contract for staking
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
