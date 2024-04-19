import React, {useState, useReducer } from "react";
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
import ExampleContext from './ExampleContext';

// Due to page contents depend on whether user is logged in or logged out (which is stored in header component)
// we need to Lift the state up (store it Main), meaning moving the state component up to the tree component so all children
// and sub components can pass the state down as props
function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("myblogappToken")),
    flashMessages:  []
  }
  function ourReducer(state, action) {
    switch(action.type) {
      case "login":
        //in react we dont not odify or mutate current state to make changes
        return {loggedIn: true, flashMessages: state.flashMessages}
      case "logout":
        return  {loggedIn: false, flashMessages: state.flashMessages}
      case "flashMessage":
        return {loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value)}
      }
  }
  // dispatch in useReducer, is used to tell WHAT actions we want to be done
  //ourReducer function is in charge of HOW our dispatch actions are done 
  const [state, dispatch] = useReducer(ourReducer, initialState )
  // created pieces of  states
  const [loggedIn, setLoggedIn] = useState();
  const [flashMessages, setFlashMessages] = useState([])

  //create general and reusable function to display func 
  function addFlashMessage(msg){
   setFlashMessages(prev => prev.concat(msg))
  }
  return (
    <ExampleContext.Provider value={{addFlashMessage, setLoggedIn}}>
   <BrowserRouter>
   <FlashMessages messages={flashMessages} />
    <Header loggedIn={loggedIn} />
    <Routes>
       <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
       <Route path="/post/:id" element={<ViewSinglePost />} />
       <Route path="/create-post" element={<CreatePost />} />
       <Route path="/about-us" element={<About />} />
       <Route path="/terms" element={<Terms />} />
    </Routes>
    <Footer />
   </BrowserRouter>
   </ExampleContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if(module.hot){
module.hot.accept()
}



