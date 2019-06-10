import { GET_PAGES_COUNT,GET_PAGE,GET_PAGES } from '../actions/pages';

const initialState = {
  count: 0,
  perPage: 0,
  pages: [],
  page: {
    _id: null,
    title: "",
    niceTitle: "",
    author: "",
    date: "",
    content: ""
  }
}

export function pagesReducer(state = initialState, action:any) {
  switch (action.type) {
    case GET_PAGES_COUNT:
      return {
        ...state,
        count: action.payload.count,
        perPage: action.payload.perPage
      };
    case GET_PAGES:
      return { ...state, pages: action.payload };
    case GET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
}
