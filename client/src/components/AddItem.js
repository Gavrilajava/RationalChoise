import React from 'react'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { API_ROOT, get_headers } from '../constants/api';

const AddItem = ({comparsionDetails, addNewItem}) => {

  const toggleClick = () => {
    const comparsion_id = comparsionDetails.id
    fetch(API_ROOT+'/items',{
      method: "POST",
      headers: get_headers(),
      body: JSON.stringify({
        name: `Item#${comparsionDetails.items.length + 1}`, 
        comparsion_id
      })
    })
      .then(resp => resp.json())
      .then(json => addNewItem(json))
  }

  return (
    <Button 
      variant="contained" 
      color="secondary"
      onClick = {toggleClick}
    >
      Add Item
    </Button> 

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