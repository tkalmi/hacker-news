import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { store, reactReduxFirebaseProps } from './store.js';
import News from './components/News/News.js';
import ItemDetails from './components/ItemDetails/ItemDetails.js';
import UserDetails from './components/UserDetails/UserDetails.js';
import Header from './components/Header/Header';

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/item/:itemId">
              <ItemDetails />
            </Route>
            <Route path="/user/:userId">
              <UserDetails />
            </Route>
            <Route path="/newstories">
              <News />
            </Route>
            <Route path="/beststories">
              <News />
            </Route>
            <Route path="/">
              <News />
            </Route>
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
