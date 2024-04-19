import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import HeaderLoggedOut from './HeaderLoggedOut'
import HeaderLoggedIn from './HeaderLoggedIn'


 //depending on wheter the user is logged in OR logged out
 //use ternary operator
 //to  change  the component from <HeaderLoggedIn /> to <HeaderLoggedOut />
//to do that, keep track of state

function Header(props) {

  return (

    <header className="header-bar bg-primary mb-3">
    <div className="container d-flex flex-column flex-md-row align-items-center p-3">
      <h4 className="my-0 mr-md-auto font-weight-normal">
        <Link to="/" className="text-white">
         My Travel Blog
        </Link>
      </h4>
     {props.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut/>}
    </div>
  </header>
  )

}



export default Header;