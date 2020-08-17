import React from 'react'
import EntryForm from './components/EntryForm'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Comparsion from './components/Comparsion'
import Navbar from './components/Navbar'
import UserMenu from './components/UserMenu'
import CreateComparsion from './components/CreateComparsion'
import PropTypes from 'prop-types'

const App = ({ user }) => {
  return (
    !user
      ? <EntryForm/>
      : <>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route exact path="/" render={(routerProps) => <Home {...routerProps} /> }/>
            <Route exact path="/comparsions/:id" render={(routerProps) => <Comparsion {...routerProps} /> }/>
            <Route exact path="/user" render={(routerProps) => <UserMenu {...routerProps} /> }/>
            <Route exact path="/create" render={(routerProps) => <CreateComparsion {...routerProps} /> }/>
          </Switch>
        </BrowserRouter>
      </>

  )
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer.user
  }
}

App.propTypes = {
  user: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(App)
