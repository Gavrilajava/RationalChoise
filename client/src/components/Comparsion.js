import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { API_ROOT, get_headers, throwError } from '../constants/api'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress'
import AddItem from './AddItem'
import AddCriterium from './AddCriterium'
import teal from '@material-ui/core/colors/teal';
import { Redirect } from 'react-router-dom'

const Comparsion = ({
  state,
  comparsions, 
  activeComparsion, 
  setComparsions, 
  comparsionDetails, 
  setComparsionDetails, 
  setActiveComparsion, 
  match: {params: {id}}}) => {
  
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    if (!comparsions.length){
      // ask api for all comparsions if we came through direct link
      fetch(API_ROOT + '/comparsions', {
        method: "GET",
        headers: get_headers()
      })
      .then(resp => resp.json())
      .then(json => {
        setComparsions(json)
        if (!activeComparsion && json.length){
          setActiveComparsion(json.find(c => c[1] === parseInt(id)))
        }
    })}
    // ask api about current comparsion
    fetch(API_ROOT + '/comparsions/' + id, {
      method: "GET",
      headers: get_headers()
    })
    .then(resp => resp.ok ? resp.json() : throwError(resp.status))
    .then(json => json.error ? throwError(json.error) : setComparsionDetails(json))
    .catch((e) => setErrors(e))
  }, [activeComparsion, comparsions.length, id, setActiveComparsion, setComparsionDetails, setComparsions])



  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: teal[500],
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


  const classes = useStyles();

  console.log(state)

  return (
    errors ? 
    <Redirect to={'/'} />
    :
    comparsionDetails ?
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Items:</StyledTableCell>
              {comparsionDetails.criteria.map(crit => <StyledTableCell align="right">{crit.name}</StyledTableCell>)}
              <StyledTableCell align="right">
                <AddCriterium/>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comparsionDetails.items.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
              </StyledTableRow>

            ))}
            <StyledTableRow key="add_item">
              <StyledTableCell component="th" scope="row">
                <AddItem />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    :
      <CircularProgress />
  );
}



const mapStateToProps = (state) => {
  return {
    state: state,
    comparsions: state.ComparsionReducer.comparsions, 
    activeComparsion: state.ComparsionReducer.activeComparsion,
    comparsionDetails: state.ComparsionReducer.comparsionDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setComparsions: ((comparsions) => dispatch({type: "setComparsions", comparsions: comparsions})),
    setActiveComparsion: ((activeComparsion) => dispatch({type: "setActiveComparsion", activeComparsion: activeComparsion})),
    setComparsionDetails: ((comparsionDetails) => dispatch({type: "setComparsionDetails", comparsionDetails: comparsionDetails})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comparsion)


