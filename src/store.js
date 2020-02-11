import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';

const firebaseConfig = {
  databaseURL: 'https://hacker-news.firebaseio.com/v0/'
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer
});

const initialState = {};

export const store = createStore(rootReducer, initialState);
export const reactReduxFirebaseProps = { firebase, dispatch: store.dispatch };
