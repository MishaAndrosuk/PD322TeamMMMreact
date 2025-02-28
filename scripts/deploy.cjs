const { ethers } = require("hardhat");

async function main() {
    const CoursePurchase = await ethers.getContractFactory("CoursePurchase");
    const coursePurchase = await CoursePurchase.deploy();
    await coursePurchase.deployed();
    console.log("CoursePurchase deployed to:", coursePurchase.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
