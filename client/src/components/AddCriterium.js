import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import { API_ROOT, get_headers } from '../constants/api';



const AddCriterium = ({comparsionDetails, addNewCriterium}) => {


  const [editable, setEditable] = useState(false)
  const [name, setName] = useState("")

  const toggleClick = () => {
    const comparsion_id = comparsionDetails.id
    fetch(API_ROOT+'/criteria',{
      method: "POST",
      headers: get_headers(),
      body: JSON.stringify({
        name,
        weight: 100,
        comparsion_id
      })
    })
      .then(resp => resp.json())
      .then(json => addNewCriterium(json))
  }





  return (
    !editable?
      <Button 
        variant="contained" 
        color="primary"
        onClick = {() => setEditable(true)}
      >
        Add Criterium
      </Button> 
    :
      <>
        <TextField 
          id="name" 
          label="Criterium" 
          type="search" 
          value = {name}
          onChange = {e => setName(e.target.value)}
          variant="outlined" 
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick = {toggleClick}
        >
          Add Criterium
        </Button> 
      </>

  )

}


const mapStateToProps = (state) => {
  return {
    comparsionDetails: state.ComparsionReducer.comparsionDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCriterium: ((criterium) => dispatch({type: "addNewCriterium", criterium: criterium})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCriterium)