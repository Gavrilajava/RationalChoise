import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { API_ROOT, getHeaders } from '../constants/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Redirect } from 'react-router-dom'
import CreateComparsion from './CreateComparsion'

const Home = ({ comparsions, activeComparsion, setComparsions, setActiveComparsion }) => {
  useEffect(() => {
    fetch(API_ROOT + '/comparsions', {
      method: 'GET',
      headers: getHeaders()
    })
      .then(resp => resp.json())
      .then(json => {
        setComparsions(json)
        if (!activeComparsion && json.length) {
          setActiveComparsion(json[0])
        }
      })
  }, [activeComparsion, setActiveComparsion, setComparsions])

  return (
    comparsions
      ? activeComparsion
        ? <Redirect to={`/comparsions/${activeComparsion[1]}`} />
        : <CreateComparsion/>
      : <CircularProgress />

  )
}

const mapStateToProps = (state) => {
  return { comparsions: state.ComparsionReducer.comparsions, activeComparsion: state.ComparsionReducer.activeComparsion }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setComparsions: (comparsions) => dispatch({ type: 'setComparsions', comparsions: comparsions }),
    setActiveComparsion: (activeComparsion) => dispatch({ type: 'setActiveComparsion', activeComparsion: activeComparsion })
  }
}

Home.propTypes = {
  comparsions: PropTypes.array,
  activeComparsion: PropTypes.array,
  setComparsions: PropTypes.func.isRequired,
  setActiveComparsion: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
