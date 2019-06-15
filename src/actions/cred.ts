import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { NEW_NOTIFICATION } from './notifications';

export const LOGIN = 'login';
export const LOGOUT = 'logout';

export const hydrate = (redirect:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get('/users/hydrate')
      .then((response:AxiosResponse) => {
        if (response.data.username) {
          dispatch({
            type: LOGIN,
            payload: response.data
          })

          dispatch({
            type: NEW_NOTIFICATION,
            payload: {
              value: { redirect: redirect }
            }
          })
        }
      })
      .catch((err:AxiosError) => {
        console.log(err);
      })
    }


export const login = (username:string, password:string, redirect:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post('/users/login', { username: username, password: password })
      .then((res:AxiosResponse) => {
        dispatch({
          type: LOGIN,
          payload: {
            role: res.data.role,
            username: res.data.username
          }
        })

        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Login Successful",
            value: { redirect: redirect }
          }
        })
      })
      .catch((err:AxiosError) => {
        var msg = (err.response && err.response.status === 403)
          ? "Unauthorized"
          : "Error";

        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: msg
          }
        })
      })
    }

export const logout = (redirect:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get('/users/logout')
      .then((res:AxiosResponse) => {
        dispatch({
          type: LOGOUT
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Logout Successful",
            value: { redirect: redirect }
          }
        });
      })
      .catch((err:AxiosError) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Logout Unsuccessful"
          }
        })
      })
    }