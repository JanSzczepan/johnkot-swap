import React, { Component } from 'react'
import Identicon from 'identicon.js'

class Navbar extends Component {

   render() {
      return (
         <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/">
            JohnKot
            </a>
            <div className='px-3'>
               <small className='text-muted m-0'>{this.props.accounts[0]}</small>
               {this.props.accounts.length ? 
                <img className='ml-2' width='30' height='30' src={`data:image/png;base64,${new Identicon(this.props.accounts[0], 30).toString()}`}/> : 
                <span></span>}
            </div>
         </nav>
      )
   }
}

export default Navbar;