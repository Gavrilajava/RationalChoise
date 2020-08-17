import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { API_ROOT, getHeaders } from '../constants/api'

const AddItem = ({ comparsionDetails, addNewItem }) => {
  const toggleClick = () => {
    fetch(API_ROOT + '/items', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name: `Item#${comparsionDetails.items.length + 1}`,
        comparsion_id: comparsionDetails.id
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
    addNewItem: (item) => dispatch({ type: 'addNewItem', item: item })
  }
}

AddItem.propTypes = {
  comparsionDetails: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)
