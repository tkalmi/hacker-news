import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import NewsItem from '../NewsItem/NewsItem.js';

const STORIES_PER_PAGE = 30;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterNav = styled.footer`
  background-color: orange;
  padding: 5px;
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
        <List>
          {storyIds
            .slice(
              (currentPage - 1) * STORIES_PER_PAGE,
              (currentPage + 1) * STORIES_PER_PAGE
            )
            .map((id, idx) => (
              <li
                key={id}
                style={{
                  display: (currentPage === 1
                  ? idx < 30
                  : 30 <= idx && idx < 60)
                    ? ''
                    : 'none'
                }}
              >
                <NewsItem
                  id={id}
                  idx={1 + idx + (currentPage - 1) * STORIES_PER_PAGE}
                />
              </li>
            ))}
        </List>
      </main>
      <FooterNav>
        <nav>
          {currentPage > 1 && (
            <Link
              to={location => `${location.pathname}?p=${currentPage - 1}`}
              aria-label="Go to previous set of stories"
            >
              Previous
            </Link>
          )}{' '}
          {(currentPage + 1) * STORIES_PER_PAGE <= storyIds.length && (
            <Link
              to={location => `${location.pathname}?p=${currentPage + 1}`}
              aria-label="Show more stories"
            >
              More
            </Link>
          )}
        </nav>
      </FooterNav>
    </section>
  );
};

export default News;
