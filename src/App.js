import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

// Redux
import {applyMiddleware, createStore} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"

import allReducer from "./Redux/Reducers/index"

// Pages
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ForgotPassword from "./Pages/ForgotPassword"
import Dashboard from "./Pages/Dashboard"

// CSS
import "./Supports/Stylesheets/Utility.css"

const store = createStore (allReducer, applyMiddleware(thunk))

function App () {
  return (
    <Provider store = {store}>
      <Router>
        <Switch>
          <Route exact path = "/" component={Login}></Route>
          <Route path = "/register" component={Register}></Route>
          <Route path = "/forgot-password" component={ForgotPassword}></Route>
          <Route path = "/dashboard" component={Dashboard}></Route>
        </Switch>
      </Router>
    </Provider>
    
  )
}

export default App;
