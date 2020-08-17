import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import {API_ROOT, get_headers} from '../constants/api';
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

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
}));

const CreateComparsion = ({comparsions, setComparsions, setActiveComparsion}) => {

  const [name, setName] = useState("")

  const history = useHistory()

  const handleClick = () => {
    fetch(API_ROOT + '/comparsions', {
      method: "POST",
      headers: get_headers(),
      body: JSON.stringify({comparsion: {name}})
    })
      .then(resp => resp.json())
      .then(json => {
        setComparsions([...comparsions, json])
        setActiveComparsion([json.name, json.id])
        history.push(`/comparsions/${json.id}`)
      })
  }

  const styles = useStyles()


  return(
    <Container maxWidth="xl">
        <Typography component="div" className = {styles.root}>
          <TextField 
            id="name" 
            label="Name Your Comparsion" 
            type="search" 
            value = {name}
            onChange = {e => setName(e.target.value)}
            variant="outlined" 
            className = {styles.input}
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick = {handleClick}
          >
            Create
          </Button> 
      </Typography>
    </Container>
  )

}


const mapStateToProps = (state) => {
  return {comparsions: state.ComparsionReducer.comparsions, activeComparsion: state.ComparsionReducer.activeComparsion}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setComparsions: ((comparsions) => dispatch({type: "setComparsions", comparsions: comparsions})),
    setActiveComparsion: ((activeComparsion) => dispatch({type: "setActiveComparsion", activeComparsion: activeComparsion})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComparsion)
