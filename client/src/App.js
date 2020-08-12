import React from 'react';
import './App.css';
import EntryForm from './components/EntryForm'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Comparsion from './components/Comparsion'
import Navbar from './components/Navbar'

const App = ({user, logOut}) => {


  return (
    !user ? 
      <EntryForm/>
    : <>
        <Navbar/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(routerProps) => <Home {...routerProps} /> }/>
            <Route exact path="/comparsions/:id" render={(routerProps) => <Comparsion {...routerProps} /> }/>
          </Switch>
        </BrowserRouter>
      </>
      
  );
}

const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (() => dispatch({type: "logout"})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)





