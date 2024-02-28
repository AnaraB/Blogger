import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


//My Components
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from "./components/Home"
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";

// Due to page contents depend on whether user is logged in or logged out (which is stored in header component)
// we need to Lift the state up (store it Main), meaning moving the state component up to the tree component so all children
// and sub components can pass the state down as props
function Main() {
  // store and track loggedIn and loggedOut states
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("myblogappToken")));
  return (
   <BrowserRouter>
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Routes>
       <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
       <Route path="/about-us" element={<About />} />
       <Route path="/terms" element={<Terms />} />
    </Routes>
    <Footer />
   </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if(module.hot){
module.hot.accept()
}



