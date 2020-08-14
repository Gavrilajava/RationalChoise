import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { API_ROOT, get_headers } from '../constants/api';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      width: '30ch',
    },
  },
}));


const SignUpForm = ({logIn}) => {

  const [name, changeUserName] = useState("")
  const [password, changePassword] = useState("")
  const [confirmPassword, changeConfirmPassword] = useState("")

  const classes = useStyles();

  const signUp = () => {
    if (password === confirmPassword && password.length){
      fetch(API_ROOT+'/users',{
        method: "POST",
        headers: get_headers(),
        body: JSON.stringify({name, password})
      })
        .then(res => res.json())
        .then(userInfo => {
          if (userInfo.token){
            logIn(userInfo)
          }
        })
    }
  }

  return (
    <form className={classes.root} autoComplete="off" >
      <TextField 
        id="name" 
        label="User Name" 
        type="search" 
        value = {name}
        onChange = {e => changeUserName(e.target.value)}
        variant="outlined" 
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value = {password}
        onChange = {e => changePassword(e.target.value)}
        variant="outlined"
      />
      <TextField
        id="outlined-password-input"
        label="Password repeat"
        type="password"
        value = {confirmPassword}
        onChange = {e => changeConfirmPassword(e.target.value)}
        variant="outlined"
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick = {signUp}
      >
        Sign up
      </Button> 
    </form>
  )

}

const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  return {logIn: ((auth) => dispatch({type: "login", auth: auth})) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)



