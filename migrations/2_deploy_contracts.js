const VetherToken = artifacts.require('VetherToken')
const DaiToken = artifacts.require('DaiToken')
const YieldFarm = artifacts.require('YieldFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(VetherToken)
  const vetherToken = await VetherToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(YieldFarm, vetherToken.address, daiToken.address)
  const yieldFarm = await YieldFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await vetherToken.transfer(yieldFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}
