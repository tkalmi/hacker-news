import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  databaseURL: 'https://hacker-news.firebaseio.com'
};

firebase.initializeApp(firebaseConfig);

export const ACTIONS = {
  SET_LAST_ITEM_ID: 'SET_LAST_ITEM_ID'
};

function lastItemIdReducer(state = -1, action) {
  switch (action.type) {
    case ACTIONS.SET_LAST_ITEM_ID:
      return action.item || -1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  lastItemId: lastItemIdReducer
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
