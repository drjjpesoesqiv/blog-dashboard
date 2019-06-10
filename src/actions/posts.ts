import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

import { NEW_NOTIFICATION } from './notifications';

export const GET_POSTS_COUNT = 'get_posts_count';
export const GET_POSTS = 'get_posts';
export const GET_POST = 'get_post';

export const newPost = (postData:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.put(`/posts`, postData)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Post Created",
            value: { redirect: "/posts" }
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

export const updatePost = (postData:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post(`/posts/update/${postData._id}`, postData)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Post Updated" }
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

export const getPostsCount = () =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/posts/count`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_POSTS_COUNT,
          payload: res.data
        })
      })
    }

export const getPostByNiceTitle = (niceTitle:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/posts/${niceTitle}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      });
    }

export const getPostById = (_id:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/posts/id/${_id}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_POST,
          payload: res.data
        })
      });
    }

export const getPostsByPage = (page:number) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get(`/posts/page/${page}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      });
    }

export const deletePost = (_id:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.delete(`/posts/${_id}`)
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Post Deleted", value: { reload: true } }
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
            payload: { content: "Error Deleting Post" }
          });
        }
      })
    }