pragma solidity ^0.8.0;

contract Donation {
    address public owner;
    uint256 public totalDonations;
    address[] public donors;

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        if (msg.sender != owner) {
            donors.push(msg.sender);
        }

        totalDonations += msg.value;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    function withdrawTo(address recipient, uint256 amount) public {
        require(msg.sender == owner, "Only owner can withdraw");
        require(amount <= address(this).balance, "Insufficient balance");
        
        payable(recipient).transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getDonors() public view returns (address[] memory) {
        return donors;
    }

    function clearDonors() public {
        require(msg.sender == owner, "Only owner can clear donors");
        delete donors;
    }
}
