import { GET_USERS_COUNT,GET_USERS,GET_USER } from '../actions/users';

const initialState = {
  count: 0,
  perPage: 0,
  users: [],
  user: {
    role: 0,
    email: "",
    username: "",
    password: ""
  }
}

export function usersReducer(state = initialState, action:any) {
  switch (action.type) {
    case GET_USERS_COUNT:
      return {
        ...state,
        count: action.payload.count,
        perPage: action.payload.perPage
      }
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
