// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoursePurchase {
    address public owner;
    mapping(address => mapping(uint256 => bool)) public purchasedCourses;

    event CourseBought(address indexed student, uint256 indexed courseId);

    constructor() {
        owner = msg.sender;
    }

    function buyCourse(uint256 courseId) external payable {
        require(!purchasedCourses[msg.sender][courseId], "Course already purchased");

        purchasedCourses[msg.sender][courseId] = true;
        emit CourseBought(msg.sender, courseId);
    }

    function hasPurchased(address student, uint256 courseId) external view returns (bool) {
        return purchasedCourses[student][courseId];
    }
}
