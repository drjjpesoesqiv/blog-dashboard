import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

import { NEW_NOTIFICATION } from './notifications';

export const GET_PAGES_COUNT = 'get_pages_count';
export const GET_PAGES = 'get_pages';
export const GET_PAGE = 'get_page';

export const newPage = (pageData:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.put(`/pages`, pageData)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Page Created",
            value: { redirect: "/pages" }
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

export const updatePage = (pageData:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post(`/pages/update/${pageData._id}`, pageData)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Page Updated" }
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

export const getPagesCount = () =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/pages/count`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_PAGES_COUNT,
          payload: res.data
        })
      })
    }

export const getPageByNiceTitle = (niceTitle:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/pages/${niceTitle}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_PAGE,
          payload: res.data
        })
      });
    }

export const getPageById = (_id:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/pages/id/${_id}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_PAGE,
          payload: res.data
        })
      });
    }

export const getPagesByPage = (page:number) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/pages/page/${page}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_PAGES,
          payload: res.data
        })
      });
    }

export const deletePage = (_id:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.delete(`/pages/${_id}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Page Deleted", value: { reload: true } }
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
            payload: { content: "Error Deleting Page" }
          });
        }
      })
    }
