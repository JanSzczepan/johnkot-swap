import React, { Component } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightLeft} from '@fortawesome/free-solid-svg-icons'

import './Main.css'

class Main extends Component {

   render() {
      return (
         <main className='swap-container'>
            <div className="token-card card">
               <div className=" card-body">
                  <h5 className="card-title text-muted">From</h5>
                  <div className="input-group input-group-lg">
                     <span className="coin-box input-group-text bg-transparent text-light" id="inputGroup-sizing-lg">Large</span>
                     <input type="text" className="coin-input form-control bg-transparent text-light" dir="rtl" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                  </div>
               </div>
            </div>

            <button type='button' className='coin-swap btn d-block my-5 mx-auto'>
               <FontAwesomeIcon icon={faRightLeft} style={{transform: "rotate(90deg)"}} className='text-light'/>
            </button>

            <div className="token-card card">
               <div className=" card-body">
                  <h5 className="card-title text-muted">To</h5>
                  <div className="input-group input-group-lg">
                     <span className="coin-box input-group-text bg-transparent text-white" id="inputGroup-sizing-lg">Large</span>
                     <input type="text" className="coin-input form-control bg-transparent text-light" dir="rtl" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
                  </div>
               </div>
            </div>

            <div className='d-flex align-items-center justify-content-between mb-4 mt-5'>
               <p className='text-muted m-0'>Exchange rate</p>
               <p className='text-light m-0'>1 ETH = 100 KOT</p>
            </div>

            <button type="button" className="btn w-100 btn-primary btn-lg">Large button</button>
         </main>
      )
   }
}

export default Main;