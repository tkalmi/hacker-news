import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { store, reactReduxFirebaseProps } from './store.js';
import News from './components/News/News.js';

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <News />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
