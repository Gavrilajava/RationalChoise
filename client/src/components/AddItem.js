import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import { API_ROOT, get_headers } from '../constants/api';

const AddItem = ({comparsionDetails, addNewItem}) => {

  const [editable, setEditable] = useState(false)
  const [name, setName] = useState("")

  const toggleClick = () => {
    const comparsion_id = comparsionDetails.id
    fetch(API_ROOT+'/items',{
      method: "POST",
      headers: get_headers(),
      body: JSON.stringify({
        name, 
        comparsion_id
      })
    })
      .then(resp => resp.json())
      .then(json => addNewItem(json))
  }

  return (
    !editable?
      <Button 
        variant="contained" 
        color="primary"
        onClick = {() => setEditable(true)}
      >
        Add Item
      </Button> 
    :
      <>
        <TextField 
          id="name" 
          label="Item Name" 
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
          Add Item
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
    addNewItem: ((item) => dispatch({type: "addNewItem", item: item})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)