import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

//My Components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
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
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("myblogappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("myblogappToken"),
      username: localStorage.getItem("myblogappUsername"),
      avatar: localStorage.getItem("myblogappAvatar"),
    },
  };
  function ourReducer(draft, action) {
    //use Immer package that gives us a draft of state that we can directly modify. And Immer will update state for us.
    switch (action.type) {
      case "login":
        //in react we dont not odify or mutate current state to make changes
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }
  // dispatch in useReducer, is used to tell WHAT actions we want to be done
  //ourReducer function is in charge of HOW our dispatch actions are done
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("myblogappToken", state.user.token);
      localStorage.setItem("myblogappUsername", state.user.username);
      localStorage.setItem("myblogappAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("myblogappToken", state.user.token);
      localStorage.removeItem("myblogappUsername", state.user.username);
      localStorage.removeItem("myblogappAvatar", state.user.avatar);
    }
  }, [state.loggedIn]);

  return (
    //setting value={{ state, dispatch }} in ExampleContext.Provider is not optimal cos it will force ALL components re-render each time even when only dipatched is used and  one specific component needs re-rendering
    //its better practice to have separate context provder for state and separate context provider for dispatch

    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
