import React, { Component } from 'react'
import './App.css'
import Web3 from 'web3'
import Navbar from './Navbar'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accounts: '',
      ethBalance: '0'
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
  }

  async componentDidMount() {
    await this.loadWeb3()
    // console.log(window.web3);
    await this.loadBlochchainData()
  }

  render() {
    return (
      <div>
        <Navbar accounts={this.state.accounts}/>
        <div className="container-fluid mt-5">
          <div className="row py-5">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Crypto Exchange</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
