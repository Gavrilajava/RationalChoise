import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import ContentEditable from 'react-contenteditable'
import { API_ROOT, getHeaders, throwError } from '../constants/api'

const Header = ({ item, change, title, apiPath }) => {
  const text = useRef(item.name)

  const handleChange = e => {
    text.current = e.target.value
    if (text.current === '') {
      text.current = `Add ${title} Name!`
    }
  }

  const handleBlur = e => {
    e.target.innerText = text.current
    if (text.current !== item.name) {
      fetch(API_ROOT + apiPath + item.id, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          name: text.current
        })
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(json => change(json))
    }
  }

  const handleFocus = e => {
    if (text.current === `Add ${title} Name!`) {
      e.target.innerText = ''
    }
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.target.blur()
    }
  }

  return (
    <ContentEditable
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown = {handleKeyDown}
      style = {text.current === `Add ${title} Name!` ? { color: 'red' } : {} }
    />

  )
}

Header.propTypes = {
  item: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired,
  title: PropTypes.string,
  apiPath: PropTypes.string
}

export default Header
