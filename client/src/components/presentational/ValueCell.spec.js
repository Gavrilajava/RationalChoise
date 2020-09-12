import React from 'react';
import ValueCell from './ValueCell';
import ContentEditable from 'react-contenteditable'
import StyledTableCell from './styledMaterialUi/StyledTableCell'
 

 
describe('ValueCell', () => {
  it('renders the StyledTableCell', () => {
    const cell = shallow(<ValueCell       
                                    html={"TestValueCell"}
                                    onBlur={() => null}
                                    onChange={() => null}
                                    onFocus={() => null}
                                    onKeyDown = {() => null} />);
    expect(cell.find(StyledTableCell)).to.have.length(1);
  });
  it('renders the ContentEditable', () => {
    const cell = shallow(<ValueCell       
                                    html={"TestValueCell"}
                                    onBlur={() => null}
                                    onChange={() => null}
                                    onFocus={() => null}
                                    onKeyDown = {() => null} />);
    expect(cell.find(ContentEditable)).to.have.length(1);
  });
});