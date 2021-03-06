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
import Container from './components/Container.js';

const GlobalStyling = createGlobalStyle`
  html {
    background-color: ${(props) => props.theme.lightAccentColor};
    color: ${(props) => props.theme.darkFontColor};
  }

  h1, h2, h3 {
    font-size: ${(props) => props.theme.largeFontSize};
    line-height: 1.35;
  }
  p {
    word-break: break-word;
  }

  p, footer, button{
    font-size: ${(props) => props.theme.normalFontSize};
    line-height: 1.35;
  }

  a {
    color: ${(props) => props.theme.linkColor};
    word-wrap: break-word;

    &:visited {
      color: ${(props) => props.theme.linkVisitedColor};
    }
  }

  button {
    cursor: pointer;

    &[disabled] {
      cursor: not-allowed;
    }
  }

  pre {
    background: ${(props) => props.theme.lightBgColor};
    overflow: scroll;
  }

  blockquote {
    font-style: italic;
    margin-left: 15px;
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
            <Header />
            <main>
              <Container>
                <Switch>
                  <Route path="/item/:itemId">
                    <ItemDetails />
                  </Route>
                  <Route path="/user/:userId">
                    <UserDetails />
                  </Route>
                  <Route path="/newstories">
                    <News path="newstories" />
                  </Route>
                  <Route path="/beststories">
                    <News path="beststories" />
                  </Route>
                  <Route path="/askstories">
                    <News path="askstories" />
                  </Route>
                  <Route path="/showstories">
                    <News path="showstories" />
                  </Route>
                  <Route path="/jobstories">
                    <News path="jobstories" />
                  </Route>
                  <Route path="/">
                    <News path="topstories" />
                  </Route>
                </Switch>
              </Container>
            </main>
          </ThemeProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
