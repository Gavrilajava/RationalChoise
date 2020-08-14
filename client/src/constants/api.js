export const API_ROOT = 'http://localhost:3000';
export const get_headers = () => {
  if (localStorage.token) {
  return ({  
    "Content-Type": "application/json",
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.token}`
    })
  }
  else{
    return ({  
      "Content-Type": "application/json",
      Accept: 'application/json',
    })
  }
};

export const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}