require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config({
  path: "./config.env",
});
/**
 *
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [process.env.deployer],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.deployer],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [process.env.deployer],
    },
    bitkubTestnet: {
      url: "https://rpc-testnet.bitkubchain.io",
      accounts: [process.env.deployer],
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.rinkeby_api,
      polygonMumbai: process.env.mumbai_api,
      bscTestnet: process.env.bsc_test_api,
    },
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
