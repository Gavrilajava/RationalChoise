import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { API_ROOT, getHeaders } from '../constants/api'

const AddCriterium = ({ comparsionDetails, addNewCriterium }) => {
  const toggleClick = () => {
    fetch(API_ROOT + '/criteria', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name: `Criterium#${comparsionDetails.criteria.length + 1}`,
        weight: 100,
        comparsion_id: comparsionDetails.id
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
    addNewCriterium: (criterium) => dispatch({ type: 'addNewCriterium', criterium: criterium })
  }
}

AddCriterium.propTypes = {
  comparsionDetails: PropTypes.object.isRequired,
  addNewCriterium: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCriterium)
