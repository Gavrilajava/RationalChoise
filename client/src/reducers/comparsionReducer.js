const initialState = {
  comparsions: [],
  activeComparsion: null,
  comparsionDetails: {
    id: null,
    name: null,
    items: [],
    criteria: [],
    values: []
  }
}

export default function ComparsionReducer (state = initialState, action) {
  switch (action.type) {
    case 'setComparsions':
      return {
        ...state,
        comparsions: action.comparsions
      }
    case 'setActiveComparsion':
      return {
        ...state,
        activeComparsion: action.activeComparsion
      }
    case 'setComparsionDetails':
      return {
        ...state,
        comparsionDetails: action.comparsionDetails
      }
    case 'addNewItem':
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
    case 'addNewCriterium':
      return {
        ...state,
        comparsionDetails: {
          ...state.comparsionDetails,
          criteria: [
            ...state.comparsionDetails.criteria,
            action.criterium
          ].sort((a, b) => a.id - b.id)
        }
      }
    case 'addNewValue':
      return {
        ...state,
        comparsionDetails: {
          ...state.comparsionDetails,
          values: [
            ...state.comparsionDetails.values.filter(v => v.item_id !== action.value.item_id || v.criterium_id !== action.value.criterium_id),
            action.value
          ]
        }
      }
    case 'changeItem':
      return {
        ...state,
        comparsionDetails: {
          ...state.comparsionDetails,
          items: [
            ...state.comparsionDetails.items.filter(v => v.id !== action.item.id),
            action.item
          ].sort((a, b) => a.id - b.id)
        }
      }
    case 'changeCriterium':
      return {
        ...state,
        comparsionDetails: {
          ...state.comparsionDetails,
          criteria: [
            ...state.comparsionDetails.criteria.filter(v => v.id !== action.criterium.id),
            action.criterium
          ].sort((a, b) => a.id - b.id)
        }
      }
    case 'changeComparsion':
      return {
        ...state,
        activeComparsion: [action.comparsion.name, action.comparsion.id],
        comparsions: [
          ...state.comparsions.filter(c => c.id !== action.comparsion.id),
          [action.comparsion.name, action.comparsion.id]
        ].sort((a, b) => a[1] - b[1]),
        comparsionDetails: {
          ...state.comparsionDetails,
          name: action.comparsion.name
        }
      }
    default:
      return state
  }
}
