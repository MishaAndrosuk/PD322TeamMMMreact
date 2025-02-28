/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };

require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.13",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};