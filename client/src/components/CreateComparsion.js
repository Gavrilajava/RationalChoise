import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import { API_ROOT, get_headers } from '../constants/api';
import {connect} from 'react-redux'

const CreateComparsion = ({comparsions, setComparsions, setActiveComparsion}) => {

  const [name, setName] = useState("")

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
      })
  }

  return(
    <Container maxWidth="xl">
      <TextField 
        id="name" 
        label="Name Your Comparsion" 
        type="search" 
        value = {name}
        onChange = {e => setName(e.target.value)}
        variant="outlined" 
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick = {handleClick}
      >
        Create
      </Button> 
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
