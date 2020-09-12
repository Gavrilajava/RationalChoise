import React from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'
import StyledTableCell from './styledMaterialUi/StyledTableCell'

const ValueCell = props => {

  const { html, 
          handleBlur, 
          handleChange, 
          handleFocus, 
          handleKeyDown, 
          style
        } = props

  return (
    <StyledTableCell align="right">
      <ContentEditable
        html={html}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown = {handleKeyDown}
        style = {style}
      />
    </StyledTableCell>
  )
}

export default ValueCell

ValueCell.propTypes = {
  html: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  style: PropTypes.string,
}