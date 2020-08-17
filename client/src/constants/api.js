export const API_ROOT = 'http://localhost:3000';
// export const API_ROOT = 'https://thawing-tundra-78986.herokuapp.com'
export const getHeaders = () => {
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