import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import AddItem from './AddItem'
import AddCriterium from './AddCriterium'
import Header from './Header'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    width: '300px'

  },
  input: {
    width: '300px'
  }

}))

const Navbar = ({ user, logOut, activeComparsion, changeComparsion, comparsions, setActiveComparsion }) => {
  const styles = useStyles()

  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  const [comparsionMenuAnchor, setComparsionMenuAnchor] = useState(null)

  const history = useHistory()

  const showUserMenu = e => {
    setUserMenuAnchor(e.currentTarget)
  }

  const hideUserMenu = () => {
    setUserMenuAnchor(null)
  }

  const showComparsionMenu = e => {
    setComparsionMenuAnchor(e.currentTarget)
  }

  const hideComparsionMenu = () => {
    setComparsionMenuAnchor(null)
  }

  const redirectToComparsion = c => {
    hideComparsionMenu()
    setActiveComparsion(c)
    history.push(`/comparsions/${c[1]}`)
  }

  const redirectToUrl = path => {
    hideComparsionMenu()
    hideUserMenu()
    history.push(path)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={styles.menuButton}
          color="inherit"
          aria-label="comparsions-menu"
          aria-haspopup="true"
          onClick={showComparsionMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="comparsions-menu"
          key = {`menu${comparsions.length}`}
          anchorEl={comparsionMenuAnchor}
          keepMounted
          open={Boolean(comparsionMenuAnchor)}
          onClose={hideComparsionMenu}
        >
          {comparsions.map(c => <MenuItem key = {`menu${c[1]}`} onClick={() => redirectToComparsion(c)}>{c[0]}</MenuItem>)}
          <MenuItem key ="new comparsion" onClick={() => redirectToUrl('/create')}>New Comparsion</MenuItem>

        </Menu>
        <Typography variant="h6" className={styles.title}>
          {activeComparsion
            ? <Header
              key = {activeComparsion[0]}
              item = {{ name: activeComparsion[0], id: activeComparsion[1] }}
              change = {changeComparsion}
              apiPath = '/comparsions/'
              title = "Comparsion"
              className={styles.input}
            />
            : null}
        </Typography>
        { activeComparsion
          ? <>
            <AddItem/>
            <AddCriterium/>
          </>
          : null
        }
        <Button aria-controls="user-menu" aria-haspopup="true" color="inherit" onClick={showUserMenu}>{user}</Button>
        <Menu
          id="user-menu"
          anchorEl={userMenuAnchor}
          keepMounted
          open={Boolean(userMenuAnchor)}
          onClose={hideUserMenu}
        >
          <MenuItem onClick={() => redirectToUrl('/user')}>My account</MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer.user,
    activeComparsion: state.ComparsionReducer.activeComparsion,
    comparsions: state.ComparsionReducer.comparsions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch({ type: 'logout' }),
    changeComparsion: (comparsion) => dispatch({ type: 'changeComparsion', comparsion: comparsion }),
    setActiveComparsion: (activeComparsion) => dispatch({ type: 'setActiveComparsion', activeComparsion: activeComparsion })
  }
}

Navbar.propTypes = {
  user: PropTypes.string.isRequired,
  logOut: PropTypes.func.isRequired,
  activeComparsion: PropTypes.array,
  changeComparsion: PropTypes.func.isRequired,
  comparsions: PropTypes.array,
  setActiveComparsion: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
