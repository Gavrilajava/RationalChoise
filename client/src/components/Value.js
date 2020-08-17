import React, {useRef} from 'react'
import ContentEditable from 'react-contenteditable'
import { API_ROOT, get_headers, throwError } from '../constants/api'
import {connect} from 'react-redux'


const Value = ({item_id, criterium_id, value={value: 'Add Value!'}, StyledTableCell, addNewValue}) => {


  const text = useRef(value.value);

  const handleChange = e => {
      text.current = e.target.value;
      if (text.current === ''){
        text.current = 'Add Value!'
      }
  };

  const handleBlur = e => {
      e.target.innerText = text.current

      fetch(API_ROOT + '/values', {
        method: "POST",
        headers: get_headers(),
        body: JSON.stringify({
          item_id,
          criterium_id,
          value: text.current
        })
      })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(json => {

        addNewValue(json)
      })
  };

  const handleFocus = e => {
    if (text.current === 'Add Value!'){
      e.target.innerText = ''
    }
  }


  const handleKeyDown = e => {
    if (e.keyCode === 13){
      e.target.blur()
    }
  }




  return(
    <StyledTableCell 
      align="right"
      key = {`cell${item_id}Х${criterium_id}`} 
    >
      <ContentEditable 
        html={text.current} 
        onBlur={handleBlur} 
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown = {handleKeyDown}
        style = {isNaN(text.current) ?  {'color': "red"} : {}  }
      />
    </StyledTableCell>

  )
} 

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewValue: ((value) => dispatch({type: "addNewValue", value: value})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Value)


