import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { NEW_NOTIFICATION } from './notifications';

export const API_GRANT = 'api_grant';
export const API_REVOKE = 'api_revoke';

export const grant = (_userId:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post('/api/grant', { _userId: _userId })
      .then((response:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Successfully granted API access",
            value: { reload: true }
          }
        })
      })
      .catch((err:AxiosError) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Error granting API access",
            value: { reload: true }
          }
        })
      })
    }

export const revoke = (_userId:string) =>
  (dispatch:Function, getState:Function, axios:AxiosInstance) => {
    axios.post('/api/revoke', { _userId: _userId })
      .then((response:AxiosResponse) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Successfully revoked API access",
            value: { reload: true }
          }
        })
      })
      .catch((err:AxiosError) => {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: {
            content: "Error revoking API access",
            value: { reload: true }
          }
        })
      })
    }
