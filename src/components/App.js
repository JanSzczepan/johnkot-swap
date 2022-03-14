import React, { Component } from 'react'
import Web3 from 'web3'

import Navbar from './Navbar'
import Main from './Main'

import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'

import './App.css' 

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: '',
      token: {},
      tokenBalance: '0',
      ethSwap: {},
      ethBalance: '0',
      rate: 100,
      isLoading: true
    }
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

  async loadBlochchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ accounts })

    const ethBalance = await web3.eth.getBalance(accounts[0])
    this.setState({ ethBalance: window.web3.utils.fromWei(ethBalance, 'Ether') })

    // console.log(this.state.accounts)
    // console.log(ethBalance)

    const networkId =  await web3.eth.net.getId()

    // Load token
    const tokenData = Token.networks[networkId]

    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.accounts[0]).call()
      this.setState({ tokenBalance: window.web3.utils.fromWei(tokenBalance.toString(), 'Ether') })
      // console.log(this.state.tokenBalance);
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    //Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]

    if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
    }
    // console.log(this.state.ethSwap);

    this.setState({ isLoading: false })
  }

  buyTokens = (ethAmount) => {
    if(ethAmount === '0') return

    this.setState({ isLoading: true })
    this.state.ethSwap.methods.buyTokens().send({ value: ethAmount, from: this.state.accounts[0]}).on('transactionHash', (hash) => {
      this.setState({ isLoading: false })
      document.location.reload()
    })
  }

  async componentDidMount() {
    await this.loadWeb3()
    // console.log(window.web3);
    await this.loadBlochchainData()
    const {ethereum} = window
    ethereum.on('accountsChanged', function (accounts) {
      document.location.reload()
    })
  }

  render() {
    let content
    if(this.state.isLoading) {
      content = <div className='loader'><div className="loader lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    } else {
      content = (
        <Main 
          ethBalance={this.state.ethBalance} 
          tokenBalance={this.state.tokenBalance}
          rate={this.state.rate}
          buyTokens={this.buyTokens}
        />
      )
    }

    return (
      <React.StrictMode>
      <div className='app-container d-flex justify-content-center align-items-center'>
        <div className="main-card card">
          <div className="main-card-header card-header p-0">
            <Navbar accounts={this.state.accounts}/>
          </div>
          <div className="main-container card-body px-4 px-sm-5 py-5">
            
            {content}
            
          </div>
        </div>        
      </div>
      </React.StrictMode>
    );
  }
}

export default App;
