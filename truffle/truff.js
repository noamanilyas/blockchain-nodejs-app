module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: { // Connects to testrpc when running on port 8550
      host: 'localhost',
      port: 8550,
      network_id: '*' // Match any network id
    },
    testnet: { // Connects to a public testnet running with geth on port 8545
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
};
