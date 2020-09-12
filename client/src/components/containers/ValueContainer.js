import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import ValueCell from '../presentational/ValueCell'
import { API_ROOT, getHeaders, throwError } from '../../constants/api'
import { connect } from 'react-redux'

const ValueContainer = ({ itemId, criteriumId, value = { value: 'Add Value!' }, StyledTableCell, addNewValue }) => {

  const text = useRef(value.value)

  const handleChange = e => {
    text.current = e.target.value
    if (text.current === '') {
      text.current = 'Add Value!'
    }
  }

  const handleBlur = e => {
    e.target.innerText = text.current
    fetch(API_ROOT + '/values', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        item_id: itemId,
        criterium_id: criteriumId,
        value: text.current
      })
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(json => {
        addNewValue(json)
      })
  }

  const handleFocus = e => {
    if (text.current === 'Add Value!') {
      e.target.innerText = ''
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.target.blur()
    }
  }

  return (
    <ValueCell
      key = {`cell${itemId}Х${criteriumId}`}
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown = {handleKeyDown}
      style = {isNaN(text.current) ? { color: 'red' } : {} }
    />
  )
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewValue: (value) => dispatch({ type: 'addNewValue', value: value })
  }
}

ValueContainer.propTypes = {
  itemId: PropTypes.number.isRequired,
  criteriumId: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  addNewValue: PropTypes.func.isRequired,
  StyledTableCell: PropTypes.element.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueContainer)
