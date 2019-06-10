import { GET_POSTS_COUNT,GET_POST,GET_POSTS } from '../actions/posts';

const initialState = {
  count: 0,
  perPage: 0,
  posts: [],
  post: {
    _id: null,
    title: "",
    niceTitle: "",
    author: "",
    date: "",
    content: ""
  }
}

export function postsReducer(state = initialState, action:any) {
  switch (action.type) {
    case GET_POSTS_COUNT:
      return {
        ...state,
        count: action.payload.count,
        perPage: action.payload.perPage
      };
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case GET_POST:
      return { ...state, post: action.payload };
    default:
      return state;
  }
}
