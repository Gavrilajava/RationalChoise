import React from 'react';
import './App.css';
import EntryForm from './components/EntryForm'
import {connect} from 'react-redux'

const App = ({user}) => {
  return (
    !user ? 
    <EntryForm/>
    : <div>{user}</div>
  );
}

const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

export default connect(mapStateToProps)(App)





