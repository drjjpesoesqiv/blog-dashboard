import { combineReducers } from 'redux';

import { credReducer } from './cred';
import { navigationReducer } from './navigation';
import { notificationsReducer } from './notifications';
import { pagesReducer } from './pages';
import { postsReducer } from './posts';
import { usersReducer } from './users';

export default combineReducers({
  cred: credReducer,
  navigation: navigationReducer,
  notifications: notificationsReducer,
  pages: pagesReducer,
  posts: postsReducer,
  users: usersReducer
});
