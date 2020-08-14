

export default function ComparsionReducer(state = {comparsions: [], activeComparsion: null, comparsionDetails: null},action){

  switch(action.type){
      case "setComparsions":
          return{
            ...state,
            comparsions: action.comparsions
          }
      case "setActiveComparsion":
          return{
            ...state,
            activeComparsion: action.activeComparsion
          }
      case "setComparsionDetails":
          return {
            ...state,
            comparsionDetails: action.comparsionDetails
          }
      case "addNewItem":
          return {
            ...state,
            comparsionDetails: {
              ...state.comparsionDetails,
              items: [
                ...state.comparsionDetails.items,
                action.item
              ]
            }
          }
      case "addNewCriterium":
            return {
              ...state,
              comparsionDetails: {
                ...state.comparsionDetails,
                criteria: [
                  ...state.comparsionDetails.criteria,
                  action.criterium
                ]
              }
            }
      default: 
          return state
  }

}
