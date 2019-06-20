import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

import { NEW_NOTIFICATION } from '../actions/notifications';

export const GET_USERS_COUNT = 'get_users_count';
export const GET_USERS = 'get_users';
export const GET_USER = 'get_user';

export const newUser = (userData:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.put(`/users`, userData)
    .then((res:AxiosResponse) => {
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {
          content: "User Created",
          value: { redirect: "/users" }
        }
      });
    })
    .catch((err:AxiosError) => {
      if (err.response && err.response.status === 403) {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Unauthorized" }
        });
      }
    })
  }

export const updateUser = (userData:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post(`/users/update/${userData._id}`, userData)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "User Updated" }
        });

        dispatch(getUserById(userData._id));
      })
      .catch((err:AxiosError) => {
        if (err.response && err.response.status === 403) {
          dispatch({
            type: NEW_NOTIFICATION,
            payload: { content: "Unauthorized" }
          });
        }
      })
    }

export const getUserById = (_id:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/users/${_id}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      })
    }

export const getUsersCount = () =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/users/count`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_USERS_COUNT,
          payload: res.data
        })
      })
    }


export const getUsersByPage = (page:number) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/users/page/${page}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_USERS,
          payload: res.data
        })
      });
    }

export const deleteUser = (_id:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.delete(`/users/${_id}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "User Deleted", value: { reload: true } }
        });
      })
      .catch((err:AxiosError) => {
        if (err.response && err.response.status === 403) {
          dispatch({
            type: NEW_NOTIFICATION,
            payload: { content: "Unauthorized" }
          });
        } else {
          dispatch({
            type: NEW_NOTIFICATION,
            payload: { content: "Error Deleting User" }
          });
        }
      })
    }