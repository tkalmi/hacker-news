import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NewsItem from '../NewsItem/NewsItem.js';
import Container from '../Container.js';

const STORIES_PER_PAGE = 30;

const List = styled.ol`
  list-style: none;
  margin-bottom: 32px;
  padding: 0;
`;

const FooterNav = styled.footer`
  background-color: ${props => props.theme.secondaryAccentColor};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  padding: 5px;
  position: fixed;
  width: 100vw;
  z-index: 1;

  a {
    padding: 0 5px;

    &[disabled] {
      color: ${props => props.theme.lightFontColor} !important;
      pointer-events: none;
      text-decoration: none;
    }
  }
`;

const News = props => {
  const path = useLocation().pathname.replace('/', '') || 'topstories';

  const query = new URLSearchParams(useLocation().search);
  const currentPage = parseInt(query.get('p') || 1, 10);

  useFirebaseConnect(`v0/${path}`);

  // Fetch top stories
  const storyIds = useSelector(state => state.firebase.data.v0?.[path]);

  // Show spinner animation while loading
  if (!isLoaded(storyIds)) {
    return 'Loading...';
  }

  // Render news items in a list of NewsItem component
  return (
    <section>
      <main>
        {/* Pre-load next page's items, but hide them */}
        <List start={(currentPage - 1) * STORIES_PER_PAGE + 1}>
          {storyIds
            .slice(
              (currentPage - 1) * STORIES_PER_PAGE,
              (currentPage + 2) * STORIES_PER_PAGE
            )
            .map((id, idx) => {
              const isVisible =
                currentPage === 1
                  ? idx < STORIES_PER_PAGE
                  : STORIES_PER_PAGE <= idx && idx < STORIES_PER_PAGE * 2;
              return (
                <li
                  key={id}
                  aria-hidden={!isVisible}
                  style={{
                    display: isVisible ? '' : 'none'
                  }}
                >
                  <NewsItem
                    id={id}
                    idx={1 + idx + (currentPage - 1) * STORIES_PER_PAGE}
                  />
                </li>
              );
            })}
        </List>
      </main>
      <FooterNav>
        <Container>
          <nav aria-label="Change to previous or next page">
            <Link
              disabled={currentPage < 2}
              to={location => `${location.pathname}?p=${currentPage - 1}`}
              aria-label="Go to previous set of stories"
            >
              Previous
            </Link>{' '}
            <Link
              disabled={(currentPage + 1) * STORIES_PER_PAGE >= storyIds.length}
              to={location => `${location.pathname}?p=${currentPage + 1}`}
              aria-label="Show more stories"
            >
              Next
            </Link>
          </nav>
        </Container>
      </FooterNav>
    </section>
  );
};

export default News;
