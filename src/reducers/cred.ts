import { LOGIN, LOGOUT } from '../actions/cred';

const initialState = {
  loggedIn: false,
  role: 0,
  username: ""
}

export function credReducer(state = initialState, action:any) {
  switch (action.type) {
    case LOGIN:
      return {
        loggedIn: true,
        role: action.payload.role,
        username: action.payload.username
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
