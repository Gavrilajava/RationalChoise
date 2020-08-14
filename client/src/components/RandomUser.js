import React, {useState, useEffect} from 'react'
import { API_ROOT, get_headers } from '../constants/api';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const RandomUser = ({state, logIn}) => {

  const [name, changeName] = useState(null)

  const password = "222222"

  const getRandomName = () => {
    fetch(API_ROOT + "/random_name")
      .then(resp => resp.json())
      .then(json => changeName(json.name))
  }

  useEffect(() => {
    getRandomName()
  }, [])

  const signUp = () => {
    fetch(API_ROOT+'/users',{
      method: "POST",
      headers: get_headers(),
      body: JSON.stringify({name, password})
    })
      .then(res => res.json())
      .then(userInfo => {
        debugger
        if (userInfo.token){
          logIn(userInfo)
        }
      })
  }

  console.log(state)

  return(
    name ?
      <>
        <div>
          Many sites offer you the opportunity to register before using your services.
          This creates some inconvenience, you have to create and remember a username, password and all that stuff.
          At the same time, we need to somehow separate your data from that of other users. 
          There is a way out of this situation, we can register a user for you with a completely random name:
          <p onClick = {getRandomName}>{name}</p>
          (Click on it to change), and a completely insecure password {password}. Then, if you have a desire.
          or you'll like the service, you can change your name and password.
          <br/>
          <br/>
        </div>
        <Button 
          variant="contained" 
          color="primary"
          onClick = {signUp}
        >
          Got it, Lets Go!
        </Button> 
      </>
    : <div>
        <CircularProgress />
      </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.UserReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {logIn: ((auth) => dispatch({type: "login", auth: auth})) }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomUser)

