import React from 'react'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { API_ROOT, get_headers } from '../constants/api';



const AddCriterium = ({comparsionDetails, addNewCriterium}) => {



  const toggleClick = () => {
    const comparsion_id = comparsionDetails.id
    fetch(API_ROOT+'/criteria',{
      method: "POST",
      headers: get_headers(),
      body: JSON.stringify({
        name: `Criterium#${comparsionDetails.criteria.length + 1}`,
        weight: 100,
        comparsion_id
      })
    })
      .then(resp => resp.json())
      .then(json => addNewCriterium(json))
  }





  return (
      <Button 
        variant="contained" 
        color="secondary"
        onClick = {toggleClick}
      >
        Add Criterium
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
    addNewCriterium: ((criterium) => dispatch({type: "addNewCriterium", criterium: criterium})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCriterium)