import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const Navbar = ({user, logOut, activeComparsion}) => {

  const styles = useStyles()

  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={styles.title}>
          {activeComparsion ? activeComparsion[0] : null}
        </Typography>
        <Button onClick = {logOut} color="inherit">{user}</Button>
      </Toolbar>
    </AppBar>
  )
}



const mapStateToProps = (state) => {
  return {user: state.UserReducer.user, activeComparsion: state.ComparsionReducer.activeComparsion}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (() => dispatch({type: "logout"})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

