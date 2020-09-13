import React from 'react';
import ReactDOM from 'react-dom'
import ValueCell from './ValueCell';
import ContentEditable from 'react-contenteditable'
import StyledTableCell from './styledMaterialUi/StyledTableCell'
import { render } from 'enzyme';
 

 
describe('ValueCell', () => {
  let cell
  before(() => {
    cell = shallow(<ValueCell       
      html={"TestValueCell"}
      onBlur={() => null}
      onChange={() => null}
      onFocus={() => null}
      onKeyDown = {() => null}
      style = {{ color: 'red' }} 
      />);
    ReactDOM.render(cell, root)
  });
  it('should render the StyledTableCell', () => {
    expect(cell.find(StyledTableCell)).to.have.length(1);
  });
  it('should render the ContentEditable', () => {
    expect(cell.find(ContentEditable)).to.have.length(1);
  });
  it('should provide onBlur to ContentEditable', () => {
    expect(cell.find(ContentEditable).props().hasOwnProperty('onBlur')).to.equal(true)
  });
  it('should provide onChange to ContentEditable', () => {
    expect(cell.find(ContentEditable).props().hasOwnProperty('onChange')).to.equal(true)
  });
  it('should provide onFocus to ContentEditable', () => {
    expect(cell.find(ContentEditable).props().hasOwnProperty('onFocus')).to.equal(true)
  });
  it('should provide onKeyDown to ContentEditable', () => {
    expect(cell.find(ContentEditable).props().hasOwnProperty('onKeyDown')).to.equal(true)
  });
  it('should display provided value', () => {
    expect(document.querySelector('[contenteditable="true"]').innerHTML).to.equal('TestValueCell')
  });
  it('should have red color if style provided', () => {
    expect(document.querySelector('[contenteditable="true"]').style.color).to.equal('red')
  });
  it('should don\'t have color if style not provided', () => {
    cell = shallow(<ValueCell       
      html={"TestValueCell"}
      onBlur={() => null}
      onChange={() => null}
      onFocus={() => null}
      onKeyDown = {() => null}
      />);
      ReactDOM.render(cell, root)
    expect(document.querySelector('[contenteditable="true"]').style.color).to.equal('')
  });




  
});