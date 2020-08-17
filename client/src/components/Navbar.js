import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import AddItem from './AddItem'
import AddCriterium from './AddCriterium'
import Header from './Header'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    width: '300px'
   
  },
  input: {
    width: '300px'
  },


}));


const Navbar = ({user, logOut, activeComparsion, changeComparsion, comparsions, setActiveComparsion}) => {

  const styles = useStyles()

  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const [comparsionMenuAnchor, setComparsionMenuAnchor] = useState(null);

  const history = useHistory()

  const showUserMenu = e => {
    setUserMenuAnchor(e.currentTarget);
  };

  const hideUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const showComparsionMenu = e => {
    setComparsionMenuAnchor(e.currentTarget);
  };

  const hideComparsionMenu = () => {
    setComparsionMenuAnchor(null);
  };

  const redirect = c => {
    hideComparsionMenu()
    setActiveComparsion(c)
    history.push(`/comparsions/${c[1]}`)
  }

  const redirect_to_create = () => {
    hideComparsionMenu()
    history.push('/create')
  }


  console.log(activeComparsion)

  return(
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
          anchorEl={comparsionMenuAnchor}
          keepMounted
          open={Boolean(comparsionMenuAnchor)}
          onClose={hideComparsionMenu}
        >
          {comparsions.map(c => <MenuItem key = {`menu${c[1]}`} onClick={() => redirect(c)}>{c[0]}</MenuItem>)}
          <MenuItem key ="new comparsion" onClick={redirect_to_create}>New Comparsion</MenuItem>
          
        </Menu>
        <Typography variant="h6" className={styles.title}>
          {activeComparsion ? 
            <Header
              key = {activeComparsion[0]}
              item = {{name: activeComparsion[0], id: activeComparsion[1]}}
              change = {changeComparsion}
              api_path = '/comparsions/'
              title = "Comparsion"
              className={styles.input}
            />
          : 
            null}
        </Typography>
        { activeComparsion 
          ?
            <>
              <AddItem/>
              <AddCriterium/>
            </>
          : 
            null
        }
        <Button aria-controls="user-menu" aria-haspopup="true" color="inherit" onClick={showUserMenu}>{user}</Button>
        <Menu
          id="user-menu"
          anchorEl={userMenuAnchor}
          keepMounted
          open={Boolean(userMenuAnchor)}
          onClose={hideUserMenu}
        >
          <MenuItem onClick={() => history.push('/user')}>My account</MenuItem>
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
    logOut: (() => dispatch({type: "logout"})),
    changeComparsion: ((comparsion) => dispatch({type: "changeComparsion", comparsion: comparsion})),
    setActiveComparsion: ((activeComparsion) => dispatch({type: "setActiveComparsion", activeComparsion: activeComparsion})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

