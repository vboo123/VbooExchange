const VbooToken = artifacts.require('VbooToken')
const DaiToken = artifacts.require('DaiToken')
const YieldFarm = artifacts.require('YieldFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy Dapp Token
  await deployer.deploy(VbooToken)
  const vbooToken = await VbooToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(YieldFarm, vbooToken.address, daiToken.address)
  const yieldFarm = await YieldFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await vbooToken.transfer(yieldFarm.address, '1000000000000000000000000')

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], '100000000000000000000')
}
