import {
  GET_NAVIGATION_ITEMS
} from '../actions/navigation';

const initialState = {
  items: []
}

export function navigationReducer(state = initialState, action:any) {
  switch (action.type) {
    case GET_NAVIGATION_ITEMS:
      return { ...state, items: action.payload };
    default:
      return { ...state };
  }
}
