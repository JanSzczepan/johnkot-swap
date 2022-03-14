import React, { Component } from 'react'

import BuyForm from './BuyForm'
import SellForm from './SellForm'

import './Main.css'


class Main extends Component {

   constructor(props) {
      super(props)
      this.state = {
         currentForm: 'buy'
      }
   }

   handleBuySellBtn = (e) => {
      if(this.state.currentForm === 'buy') {
         this.setState({ currentForm: 'sell' })
      } else if(this.state.currentForm === 'sell') {
         this.setState({ currentForm: 'buy' })
      }
   }

   render() {
      let content
      if(this.state.currentForm === 'buy') {
         content = (
            <BuyForm 
               ethBalance={this.props.ethBalance} 
               tokenBalance={this.props.tokenBalance}
               rate={this.props.rate}
               buyTokens={this.props.buyTokens} 
               changeBuySellForm={this.handleBuySellBtn} 
            />
         )
      } else {
         content = (
            <SellForm 
               ethBalance={this.props.ethBalance} 
               tokenBalance={this.props.tokenBalance}
               rate={this.props.rate}
               sellTokens={this.props.sellTokens} 
               changeBuySellForm={this.handleBuySellBtn}
            />
         )
      }

      return (
         <main className='swap-container'>
            {content}
         </main>
      )
   }
}

export default Main;