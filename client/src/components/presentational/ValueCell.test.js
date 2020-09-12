import React from 'react'
import {shallow} from 'enzyme'
import ValueCell from './ValueCell'

describe('ValueCell', () => {

  it('should render with full props without throwing', () => {
    shallow(
      <ValueCell 
        html="22"
        onBlur={() => true}
        onChange={() => true}
        onFocus={() => true}
        onKeyDown = {() => true}
        style = {{ color: 'red' }}
      />
    )
  })

  it('should render with only required props without throwing', () => {
    shallow(
      <ValueCell 
        onBlur={() => true}
        onChange={() => true}
        onFocus={() => true}
        onKeyDown = {() => true}
      />
    )
  })

})
