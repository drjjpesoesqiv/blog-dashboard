import {
  NEW_NOTIFICATION,
  DISMISS_NOTIFICATION,
  CLEAR_NOTIFICATION_VALUE
} from '../actions/notifications';

const initialState = {
  dismissed: true,
  content: "",
  value: {}
}

export function notificationsReducer(state = initialState, action:any) {
  switch (action.type) {
    case NEW_NOTIFICATION:
      var nextState = { ...state, dismissed: false, content: action.payload.content };
      nextState.value = action.payload.value || {};
      return nextState;
    case DISMISS_NOTIFICATION:
      return { ...state, dismissed: true, value: {} };
    case CLEAR_NOTIFICATION_VALUE:
      return { ...state, value: {} };
    default:
      return { ...state };
  }
}
