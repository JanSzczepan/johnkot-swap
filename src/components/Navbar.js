import React, { Component } from 'react'
import Identicon from 'identicon.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

import './Navbar.css'

class Navbar extends Component {

   render() {
      return (
         <>
         <nav className="main-nav navbar navbar-expand-md navbar-dark bg-dark px-md-3">
            <div className="container-fluid">
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <FontAwesomeIcon icon={faBars} className='text-light'/>
               </button>
               <a className="navbar-brand" href="/">JohnKot</a>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto me-md-0 ms-md-auto mb-2 mb-md-0">
                     <li className="nav-item ms-auto">
                        <div className='indenticon-container px-3'>
                           <small className='text-muted m-0 text-break'>{this.props.accounts[0]}</small>
                           {this.props.accounts.length ? 
                           <img className='ms-2 my-2' width='32' height='32' src={`data:image/png;base64,${new Identicon(this.props.accounts[0], 30).toString()}`} alt='identicon'/> : 
                           <span></span>}
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
         {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark p-0">
            <a className="navbar-brand col-sm-3 col-md-2 me-0 px-3" href="/">
            JohnKot
            </a>
            <div className='px-3'>
               <small className='text-muted m-0'>{this.props.accounts[0]}</small>
               {this.props.accounts.length ? 
                <img className='ms-2' width='30' height='30' src={`data:image/png;base64,${new Identicon(this.props.accounts[0], 30).toString()}`} alt='identicon'/> : 
                <span></span>}
            </div>
         </nav> */}
         </>
      )
   }
}

export default Navbar;