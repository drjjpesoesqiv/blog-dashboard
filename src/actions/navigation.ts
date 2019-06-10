import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

import { NEW_NOTIFICATION } from './notifications';

export const UPDATE_NAVIGATION_ITEMS = 'update_navigation_items';
export const GET_NAVIGATION_ITEMS = 'get_navigation_items';

export const getNavigationItems = () =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.get('/navigation')
      .then((res:AxiosResponse) => {
        dispatch({
          type: GET_NAVIGATION_ITEMS,
          payload: res.data
        });
      })
      .catch((err:AxiosError) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Error fetching navigation items" }
        })
      });
    }

export const updateNavigationItems = (items:any) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post('/navigation/update', { items: items })
      .then((res:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Navigation items updated" }
        })
      })
      .catch((err:AxiosError) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: { content: "Error updating navigation items" }
        })
      });
    }


