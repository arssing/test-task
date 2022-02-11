//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Donations {
    address public owner;
    address[] senders;
    mapping (address => uint) donationBySender;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not an owner!");
        _;
    }

    function getSenders() public view returns (address[] memory) {
        return senders;
    }

    function withdraw(address payable _to, uint amount) public onlyOwner {
        require(address(this).balance >= amount, "Amount is too big");

        _to.transfer(amount);
    }

    function getDonation(address _addr) public view returns (uint) {
        return donationBySender[_addr];
    }

    function deposit() external payable {
        if (donationBySender[msg.sender] == 0) {
            senders.push(msg.sender);
        }
        donationBySender[msg.sender] += msg.value;
    }
}