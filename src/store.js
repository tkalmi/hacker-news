import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  databaseURL: 'https://hacker-news.firebaseio.com'
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};

export const store = createStore(rootReducer, initialState);
export const reactReduxFirebaseProps = {
  config: {
    userProfile: 'users'
  },
  dispatch: store.dispatch,
  firebase
};
