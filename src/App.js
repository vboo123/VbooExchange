import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from './abis/DaiToken.json'
import VbooToken from './abis/VbooToken.json'
import TokenFarm from './abis/YieldFarm.json'
import Navbar from './components/Navbar'
import Home from './components/Home'
import './App.css'

class App extends Component {


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }

    // Load VetherToken
    const vbooTokenData = VbooToken.networks[networkId]
    if(vbooTokenData) {
      const vbooToken = new web3.eth.Contract(VbooToken.abi, vbooTokenData.address)
      this.setState({ vbooToken })
      let vbooTokenBalance = await vbooToken.methods.balanceOf(this.state.account).call()
      this.setState({ vbooTokenBalance: vbooTokenBalance.toString() })
    } else {
      window.alert('VbooToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.depositedBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  depositTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.depositTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unDepositTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unDepositTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      vbooToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      vbooTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Home
        daiTokenBalance={this.state.daiTokenBalance}
        vbooTokenBalance={this.state.vbooTokenBalance}
        stakingBalance={this.state.stakingBalance}
        depositTokens={this.depositTokens}
        unDepositTokens={this.unDepositTokens}
      />
      // these are all the properties I am sending to the home page
    }
    return (
      <div className="background-red">
        <Navbar account={this.state.account} />
            <home role="home" className="background-red" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
              </div>
            </home>
      </div>
    );
  }
}

export default App;
