import { userTypes } from "../types/user.types";
import axios from "../../axios";


// export const loginAction = (data) =>{
//   return dispatch =>{
//     dispatch({ type: userTypes.LOGIN_START });
//     axios.post("/auth/login/",data).then(response=>{
//       localStorage.setItem("user", JSON.stringify(data));
//       dispatch({ type: userTypes.LOGIN_SUCCESS, user: response.data });
//     }).catch((error)=>{
//       //console.log(error.response)
//       dispatch({
//         type: userTypes.LOGIN_FAILURE,
//         error:
//           error.response && error.response.data
//             ? error.response.data.detail
//             : error.message,
//       });
//     });
//   }
// }




export const registerAction = (data) => {
  return dispatch => {
    dispatch(authStart());
    axios.post("/auth/signup/", data).then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.access_expires_in * 1000);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(response.data.user, response.data.access));
      dispatch(checkAuthTimeout(response.data.access_expires_in));
      setAuthRedirectPath(response.data.user.id);
    }).catch((error) => {

      dispatch(authFail(error.response.data.detail))

    })
  }
}



// updated login functionalities


export const authStart = () => {
  return {
    type: userTypes.AUTH_START
  }
}

export const authSuccess = (user, token) => {

  return {
    type: userTypes.AUTH_SUCCESS,
    payload: {
      'user': user,
      'token': token
    }
  }
}

export const authFail = (error) => {
  return {
    type: userTypes.AUTH_FAIL,
    error: error
  }
}


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expirationDate');
  return {
    type: userTypes.AUTH_LOGOUT,
    error: null,
  }
}


export const checkAuthTimeout = (expirationTime) => {
  //  console.log(expirationTime)
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }

}

export const auth = (email, password) => {

  return dispatch => {
    dispatch(authStart());

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    axios.post('/auth/login/', formData).then(response => {
      // console.log(response)
      const expirationDate = new Date(new Date().getTime() + response?.data?.access_expires_in * 1000);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(authSuccess(response?.data?.user, response?.data?.access));
      dispatch(checkAuthTimeout(response?.data?.access_expires_in));
      setAuthRedirectPath(response?.data?.user.pk);
    }).catch(error => {
      // console.log(error.response.data)
      dispatch(authFail(error?.response?.data?.detail))
    })
  }

};


export const setAuthRedirectPath = (path) => {
  return {
    type: userTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
};


export const authCheckState = () => {
  return dispatch => {

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      dispatch(logout());
    } else {
      //setupNotification(user.id);

      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate >= new Date()) {
        // console.log('greater')
        dispatch(authSuccess(user, token));
        // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        // console.log('not more than')
      }


    }

  }
};


export const loadAuthUser = (user) => {
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(user));
  return {
    type: userTypes.LOAD_AUTH_USER,
    user: user
  }
}
