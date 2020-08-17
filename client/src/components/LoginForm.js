import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { API_ROOT, getHeaders } from '../constants/api'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      width: '30ch'
    }
  }
}))

const LoginForm = ({ logIn }) => {
  const [name, changeName] = useState('')
  const [password, changePassword] = useState('')

  const classes = useStyles()

  const handleLogIn = () => {
    fetch(API_ROOT + '/login', {
      method: 'POST',
      headers: getHeaders,
      body: JSON.stringify({ name, password })
    })
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo.token) {
          logIn(userInfo)
        }
      })
  }

  return (
    <form className={classes.root} autoComplete="off" >
      <TextField
        id="outlined-search"
        label="User Name"
        type="search"
        value = {name}
        onChange = {e => changeName(e.target.value)}
        variant="outlined"
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        value = {password}
        onChange = {e => changePassword(e.target.value)}
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick = {handleLogIn}
      >
        Log in
      </Button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return { user: state.UserReducer.user }
}

const mapDispatchToProps = (dispatch) => {
  return { logIn: (auth) => dispatch({ type: 'login', auth: auth }) }
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
