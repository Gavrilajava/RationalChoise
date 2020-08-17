import React, {useRef} from 'react'
import ContentEditable from 'react-contenteditable'
import { API_ROOT, get_headers, throwError } from '../constants/api'


const Header = ({item, change, title, api_path}) => {


  const text = useRef(item.name);

  const handleChange = e => {
      text.current = e.target.value;
      if (text.current === ''){
        text.current = `Add ${title} Name!`
      }
  };

  const handleBlur = e => {
      e.target.innerText = text.current
        if (text.current !== item.name){
        fetch(API_ROOT + api_path + item.id, {
          method: "PATCH",
          headers: get_headers(),
          body: JSON.stringify({
            name: text.current
          })
        })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(json => change(json))
      }
  };

  const handleFocus = e => {
    if (text.current === `Add ${title} Name!`){
      e.target.innerText = ''
    }
  }


  const handleKeyDown = e => {
    if (e.keyCode === 13){
      e.target.blur()
    }
  }




  return(
    <ContentEditable 
      html={text.current} 
      onBlur={handleBlur} 
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown = {handleKeyDown}
      style = {text.current === `Add ${title} Name!` ?  {'color': "red"} : {}  }
    />

  )
} 

export default Header


