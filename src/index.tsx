import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

import * as serviceWorker from './serviceWorker';

import axios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import reducers from './reducers';

import Container from '@material-ui/core/Container';

import Navigation from './components/Navigation';
import Notifications from './components/Notifications';

import Login from './pages/Login';

import PagesList from './pages/Pages/PagesList';
import NewPage from './pages/Pages/NewPage';
import UpdatePage from './pages/Pages/UpdatePage';

import PostsList from './pages/Posts/PostsList';
import NewPost from './pages/Posts/NewPost';
import UpdatePost from './pages/Posts/UpdatePost';

import UsersList from './pages/Users/UsersList';
import NewUser from './pages/Users/NewUser';
import UpdateUser from './pages/Users/UpdateUser';

import NavigationList from './pages/Navigation/NavigationList';

import { hydrate } from './actions/cred';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  withCredentials: true
});

var store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

store.dispatch(hydrate(window.location.pathname));

ReactDOM.render(
  <Provider store={store}>
    <Container maxWidth="md">
      <BrowserRouter>
        <Notifications />
        <Navigation />
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/navigation" component={NavigationList} />

        <Route exact path="/users" component={UsersList} />
        <Route exact path="/users/page/:page" component={UsersList} />
        <Route exact path="/users/new" component={NewUser} />
        <Route exact path="/users/u/:_id" component={UpdateUser} />

        <Route exact path="/posts" component={PostsList} />
        <Route exact path="/posts/page/:page" component={PostsList} />
        <Route exact path="/posts/new" component={NewPost} />
        <Route exact path="/posts/u/:_id" component={UpdatePost} />

        <Route exact path="/pages" component={PagesList} />
        <Route exact path="/pages/page/:page" component={PagesList} />
        <Route exact path="/pages/new" component={NewPage} />
        <Route exact path="/pages/u/:_id" component={UpdatePage} />
      </BrowserRouter>
    </Container>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
