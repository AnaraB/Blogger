import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'


//My Components
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Home from "./components/Home"
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinlePost";
import FlashMessages from "./components/FlashMessages";

// Due to page contents depend on whether user is logged in or logged out (which is stored in header component)
// we need to Lift the state up (store it Main), meaning moving the state component up to the tree component so all children
// and sub components can pass the state down as props
function Main() {
  // created pieces of  states
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("myblogappToken")));
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg){
   setFlashMessages(prev => prev.concat(msg))
  }
  return (
   <BrowserRouter>
   <FlashMessages messages={flashMessages} />
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Routes>
       <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
       <Route path="/post/:id" element={<ViewSinglePost />} />
       <Route path="/create-post" element={<CreatePost addFlashMessage={addFlashMessage} />} />
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



