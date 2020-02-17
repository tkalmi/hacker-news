import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { store, reactReduxFirebaseProps } from './store.js';
import News from './components/News/News.js';
import ItemDetails from './components/ItemDetails/ItemDetails.js';
import UserDetails from './components/UserDetails/UserDetails.js';
import Header from './components/Header/Header';
import { standardTheme } from './theme.js';
import ScrollToTop from './components/ScrollToTop.js';
import Container from './components/Container.js';

const GlobalStyling = createGlobalStyle`
html {
  color: #333;
}
  p {
    font-size: ${props => props.theme.normalFontSize};
    line-height: 1.35;
  }

  pre {
    background: lightgrey;
    overflow: scroll;
  }

  blockquote {
    quotes: "“" "”" "‘" "’";

    &::before {
      content: open-quote;
    }
    &::after {
      content: close-quote;
    }
  }
`;

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <BrowserRouter>
          <ThemeProvider theme={standardTheme}>
            <GlobalStyling />
            <ScrollToTop />
            <Header />
            <Container>
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
            </Container>
          </ThemeProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
