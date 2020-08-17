import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { API_ROOT, getHeaders, throwError } from '../constants/api'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import teal from '@material-ui/core/colors/teal'
import { Redirect } from 'react-router-dom'
import Value from './Value'
import Header from './Header'

const Comparsion = ({
  comparsions,
  activeComparsion,
  setComparsions,
  comparsionDetails,
  setComparsionDetails,
  setActiveComparsion,
  changeItem,
  changeCriterium,
  match: { params: { id } }
}) => {
  const [errors, setErrors] = useState(null)

  const { name, items, criteria, values } = comparsionDetails

  useEffect(() => {
    if (!comparsions.length) {
      // ask api for all comparsions if we came through direct link
      fetch(API_ROOT + '/comparsions', {
        method: 'GET',
        headers: getHeaders()
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(json => {
          setComparsions(json)
          if (!activeComparsion && json.length) {
            setActiveComparsion(json.find(c => c[1] === parseInt(id)))
          }
        })
        .catch((e) => setErrors(e))
    }
    // ask api about current comparsion
    fetch(API_ROOT + '/comparsions/' + id, {
      method: 'GET',
      headers: getHeaders()
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(json => json.error ? throwError(json.error) : setComparsionDetails(json))
      .catch((e) => setErrors(e))
  }, [activeComparsion, comparsions.length, id, setActiveComparsion, setComparsionDetails, setComparsions])

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: teal[500],
      color: theme.palette.common.white

    },
    body: {
      fontSize: 14,
      width: 'auto'
    }
  }))(TableCell)

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow)

  const classes = makeStyles({
    table: {
      minWidth: 700
    }
  })

  // choose only criterium where all values are !NaN and values for all items exists, we'll use them for sorting purposes
  const validCriteria = () => {
    return criteria.filter(crit => {
      const criteriaValues = values.filter(v => v.criterium_id === crit.id)
      return (
        criteriaValues.every(v => v && !isNaN(v.value))) && // all values are !NaN
        criteriaValues.length === items.length // values exist for all items
    })
  }

  // calculate average value for the criterium
  const averageValue = criteriaId => {
    return values.filter(v => v.criterium_id === criteriaId).reduce((avg, val, ind) => {
      return (avg * ind + parseInt(val.value)) / (ind + 1)
    }, 0)
  }

  // save average values in array for performance purposes
  const criteriaForSorting = validCriteria().map(crit => {
    return {
      id: crit.id,
      weight: crit.weight,
      average: averageValue(crit.id)
    }
  })

  // calcilate total values for the item

  const totalValues = item => {
    return criteriaForSorting.reduce((avg, crit, ind) => {
      const val = parseInt(values.find(v => v.criterium_id === crit.id && v.item_id === item.id).value)
      return (avg * ind + val / crit.average) / (ind + 1)
    }, 0) * 100
  }

  // sort items according total values
  const sortedItems = () => {
    const itemsWithTotal = items.map(item => { return { ...item, total: totalValues(item) } })
    return itemsWithTotal.sort((a, b) => b.total - a.total)
  }

  return (
    errors
      ? <Redirect to={'/'} />
      : name
        ? <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Items:</StyledTableCell>
                {criteria.map(crit =>
                  <StyledTableCell
                    component="th"
                    scope="column"
                    key = {`crit${crit.id}`}
                    align ="right"
                  >
                    <Header
                      item = {crit}
                      change = {changeCriterium}
                      apiPath = '/criteria/'
                      title = "Criterium"
                    />
                  </StyledTableCell>
                )
                }
                {criteriaForSorting.length
                  ? <StyledTableCell align="right" >Total:</StyledTableCell>
                  : null
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItems().map((item) =>
                <StyledTableRow key={`item${item.id}`}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    key = {`item${item.id}`}
                  >
                    <Header
                      item = {item}
                      change = {changeItem}
                      apiPath = '/items/'
                      title = "Item"
                    />
                  </StyledTableCell>

                  { criteria.map(crit =>
                    <Value
                      key = {`val${item.id}Х${crit.id}`}
                      StyledTableCell = {StyledTableCell}
                      itemId = {item.id}
                      criteriumId ={crit.id}
                      value = {values.find(v => v.item_id === item.id && v.criterium_id === crit.id)}
                    />
                  )

                  }
                  {
                    criteriaForSorting.length
                      ? <StyledTableCell
                        align="right"
                        key = {`total${item.id}`}
                      >
                        {Math.round(item.total)}

                      </StyledTableCell>
                      : null
                  }
                </StyledTableRow>
              )
              }
            </TableBody>
          </Table>
        </TableContainer>
        : <CircularProgress />
  )
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
    setComparsions: (comparsions) => dispatch({ type: 'setComparsions', comparsions: comparsions }),
    setActiveComparsion: (activeComparsion) => dispatch({ type: 'setActiveComparsion', activeComparsion: activeComparsion }),
    setComparsionDetails: (comparsionDetails) => dispatch({ type: 'setComparsionDetails', comparsionDetails: comparsionDetails }),
    changeItem: (item) => dispatch({ type: 'changeItem', item: item }),
    changeCriterium: (criterium) => dispatch({ type: 'changeCriterium', criterium: criterium })
  }
}

Comparsion.propTypes = {
  comparsionDetails: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired,
  comparsions: PropTypes.array,
  activeComparsion: PropTypes.array,
  setComparsions: PropTypes.func.isRequired,
  setComparsionDetails: PropTypes.func.isRequired,
  setActiveComparsion: PropTypes.func.isRequired,
  changeItem: PropTypes.func.isRequired,
  changeCriterium: PropTypes.func.isRequired,
  match: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Comparsion)
