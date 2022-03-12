import React, { Component } from 'react'
import Web3 from 'web3'

import Navbar from './Navbar'

import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'

import './App.css'
import Main from './Main'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: '',
      token: {},
      tokenBalance: '0',
      ethSwap: {},
      ethBalance: '0',
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
    this.setState({ ethBalance })

    // console.log(this.state.accounts)
    // console.log(ethBalance)

    const networkId =  await web3.eth.net.getId()

    // Load token
    const tokenData = Token.networks[networkId]

    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.accounts[0]).call()
      this.setState({ tokenBalance: tokenBalance.toString() })
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

  async componentDidMount() {
    await this.loadWeb3()
    // console.log(window.web3);
    await this.loadBlochchainData()
  }

  render() {
    let content
    if(this.state.isLoading) {
      content = <p className='m-0 display-6'>Loading...</p>
    } else {
      content = <Main />
    }

    return (
      <div>
        <Navbar accounts={this.state.accounts}/>
        <div className="container-fluid mt-5">
          <div className="row py-5">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content ms-auto me-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
