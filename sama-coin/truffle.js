// loading config
require('dotenv').config();

// [mnemonic] : Metamask - Settings - Reveal Seed Words 에서 확인할 수 있는 12개의 단어로 이뤄진 값임
let HDWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = process.env.MNEMONIC;
let infura = process.env.INFURA;

// console.log(mnemonic, infura);

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infura}`),
      network_id: '3'
    }
  }
};