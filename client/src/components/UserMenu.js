import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { API_ROOT, getHeaders } from '../constants/api'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh'
  },
  input: {
    marginBottom: '1em'
  }
}))

const UserMenu = ({ user, setUserName }) => {
  const [name, setName] = useState(user)
  const [password, changePassword] = useState('')
  const [confirmPassword, changeConfirmPassword] = useState('')

  const handleClick = () => {
    let body = { name }
    if (password.length && password === confirmPassword) {
      body = { ...body, password }
    }
    fetch(API_ROOT + '/users', {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(json => setUserName(json.user))
  }

  const styles = useStyles()

  return (
    <Container maxWidth="xl">
      <Typography component="div" className = {styles.root}>
        <TextField
          id="name"
          label="Name"
          value = {name}
          onChange = {e => setName(e.target.value)}
          variant="outlined"
          className = {styles.input}
        />
        <p>Leave password field empty, if you do not want to change it</p>
        <TextField
          id="password"
          label="New password"
          type="password"
          value = {password}
          onChange = {e => changePassword(e.target.value)}
          variant="outlined"
          className = {styles.input}
        />
        <TextField
          id="outlined-password-input"
          label="New password repeat"
          type="password"
          value = {confirmPassword}
          onChange = {e => changeConfirmPassword(e.target.value)}
          variant="outlined"
          className = {styles.input}
        />
        <Button
          variant="contained"
          color="primary"
          onClick = {handleClick}
        >
            Update
        </Button>
      </Typography>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return { user: state.UserReducer.user }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: (username) => dispatch({ type: 'setName', username: username })
  }
}

UserMenu.propTypes = {
  user: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
