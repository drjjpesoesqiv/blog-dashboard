export const NEW_NOTIFICATION = 'new_notification';
export const DISMISS_NOTIFICATION = 'dismiss_notification';
export const CLEAR_NOTIFICATION_VALUE = 'clear_value';

export const clearNotificationValue = () => (dispatch:Function) => {
  dispatch({
    type: CLEAR_NOTIFICATION_VALUE
  })
}

export const dismissNotification = () => (dispatch:Function) => {
  dispatch({
    type: DISMISS_NOTIFICATION
  })
}
