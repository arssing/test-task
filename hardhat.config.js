require("solidity-coverage")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-waffle")
require("./tasks")
require("dotenv").config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.4",

  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY2],
    },
  },
};
