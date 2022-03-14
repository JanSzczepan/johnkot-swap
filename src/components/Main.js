import React, { Component } from 'react'

import './Main.css'

import BuyForm from './BuyForm'

class Main extends Component {

   render() {

      return (
         <main className='swap-container'>
            <BuyForm 
               ethBalance={this.props.ethBalance} 
               tokenBalance={this.props.tokenBalance}
               rate={this.props.rate}
               buyTokens={this.props.buyTokens}   
            />
         </main>
      )
   }
}

export default Main;