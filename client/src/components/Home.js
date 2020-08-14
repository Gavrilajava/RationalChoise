import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { API_ROOT, get_headers } from '../constants/api'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Redirect } from 'react-router-dom'
import CreateComparsion from './CreateComparsion'

const Home = ({comparsions, activeComparsion, setComparsions, setActiveComparsion})  => {

  useEffect(() => {
    fetch(API_ROOT + '/comparsions', {
      method: "GET",
      headers: get_headers()
    })
    .then(resp => resp.json())
    .then(json => {
      setComparsions(json)
      if (!activeComparsion && json.length){
        setActiveComparsion(json[0])
      }
    })
  }, [activeComparsion, setActiveComparsion, setComparsions])


  return(
    comparsions ?
      activeComparsion ?
        <Redirect to={`/comparsions/${activeComparsion[1]}`} />
      :
        <CreateComparsion/>
    :
      <CircularProgress />

  )
}



const mapStateToProps = (state) => {
  return {comparsions: state.ComparsionReducer.comparsions, activeComparsion: state.ComparsionReducer.activeComparsion}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setComparsions: ((comparsions) => dispatch({type: "setComparsions", comparsions: comparsions})),
    setActiveComparsion: ((activeComparsion) => dispatch({type: "setActiveComparsion", activeComparsion: activeComparsion})) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


