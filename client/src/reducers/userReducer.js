const initialUser = () => {
  if (localStorage.token) {
    const user = localStorage.username
    return { user }
  } else {
    return { user: false }
  }
}

export default function UserReducer (state = initialUser(), action) {
  switch (action.type) {
    case 'login':
      localStorage.username = action.auth.user
      localStorage.token = action.auth.token
      return {
        ...state,
        user: action.auth.user
      }
    case 'setName':
      localStorage.username = action.username
      return {
        ...state,
        user: action.username
      }
    default:
      return state
  }
}
