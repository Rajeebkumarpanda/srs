import React, { createContext, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import About from "./components/About";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Errorpage from "./components/Errorpage";

import {initialState,reducer} from '../src/reducer/UseReducer'

 //1:context api
 export const Usercontext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/contact">
        <Contact />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route>
        <Errorpage />
      </Route>
    </Switch>
  );
};

const App = () => {
 
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    
    <>
      <Usercontext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routing />
      </Usercontext.Provider>
    </>
  );
};

export default App;
