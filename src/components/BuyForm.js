import React, { Component } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightLeft} from '@fortawesome/free-solid-svg-icons'

import './Main.css'

import CATLogo from '../img/CAT.png'
import ETHLogo from '../img/ETH.svg.png'

class BuyForm extends Component {

   constructor(props) {
      super(props)
      this.state = {
         output: '0'
      }
   }

   handleInputChange = (e) => {
      const ethAmount = e.target.value
      this.setState({ output: String(ethAmount * this.props.rate) })
      // console.log(this.state.output)
   }

   handleFormSubmit = (e) => {
      e.preventDefault()
      if(!this.input.value || this.input.value === '0') return

      console.log('submit Buy')
      let ethAmount
      ethAmount = this.input.value.toString()
      ethAmount = window.web3.utils.toWei(ethAmount, 'Ether')
      this.props.buyTokens(ethAmount)
   }

   render() {

      return (
         <form onSubmit={this.handleFormSubmit}>
            <div className="token-card card">
               <div className=" card-body">
                  <h5 className="card-title text-muted">From</h5>
                  <div className="input-group input-group-lg">
                     <span className="coin-box input-group-text bg-transparent text-light" id="inputGroup-sizing-lg">
                        <img src={ETHLogo} className='me-2' alt='Eth logo' height='30px'/>
                        ETH
                     </span>
                     <input type="number" step="0.000001" className="coin-input form-control bg-transparent text-light" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={this.handleInputChange} ref={(input) => this.input = input} placeholder='0'/>
                  </div>
               </div>
            </div>

            <button type='button' className='coin-swap btn d-block my-4 mx-auto' onClick={this.props.changeBuySellForm}>
               <FontAwesomeIcon icon={faRightLeft} style={{transform: "rotate(90deg)"}} className='text-light'/>
            </button>

            <div className="token-card card">
               <div className=" card-body">
                  <h5 className="card-title text-muted">To</h5>
                  <div className="input-group input-group-lg">
                     <span className="coin-box input-group-text bg-transparent text-white" id="inputGroup-sizing-lg">
                        <img src={CATLogo} className='me-2' alt='CAT token logo' height='22px'/>
                        KOT
                     </span>  
                     <input type="text" className="coin-input form-control bg-transparent text-light" dir="rtl" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={this.state.output} disabled/>
                  </div>
               </div>
            </div>

            <div className='d-flex align-items-center justify-content-between mb-2 mt-5'>
               <p className='text-muted m-0'>ETH balance:</p>
               <p className='text-light m-0 text-end'>{this.props.ethBalance} ETH</p>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-2'>
               <p className='text-muted m-0'>KOT balance:</p>
               <p className='text-light m-0 text-end'>{this.props.tokenBalance} KOT</p>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4'>
               <p className='text-muted m-0'>Exchange rate</p>
               <p className='text-light m-0 text-end'>1 ETH = 100 KOT</p>
            </div>

            <button type="submit" className="btn w-100 btn-primary btn-lg">SWAP!</button>
         </form>
      )
   }
}

export default BuyForm;