import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { Link, useLocation } from 'react-router-dom';

import NewsItem from '../NewsItem/NewsItem.js';

const STORIES_PER_PAGE = 30;

const News = props => {
  const query = new URLSearchParams(useLocation().search);
  const currentPage = parseInt(query.get('p') ?? 0, 10);

  useFirebaseConnect('v0/topstories');

  // Fetch top stories
  const topStoryIds = useSelector(state => state.firebase.data.v0?.topstories);

  // Show spinner animation while loading
  if (!isLoaded(topStoryIds)) {
    return 'Loading...';
  }

  // Render news items in a list of NewsItem component
  return (
    <section>
      <header>
        <h1>Today's Top Stories</h1>
        <nav>
          <Link to={`/?p=${currentPage - 1}`} disabled={currentPage === 0}>
            Prev
          </Link>
          <Link
            to={`/?p=${currentPage + 1}`}
            disabled={(currentPage + 1) * STORIES_PER_PAGE > topStoryIds.length}
          >
            Next
          </Link>
        </nav>
      </header>

      <main>
        <ol start={1 + currentPage * STORIES_PER_PAGE}>
          {topStoryIds
            .slice(
              currentPage * STORIES_PER_PAGE,
              (currentPage + 2) * STORIES_PER_PAGE
            )
            .map((id, idx) => (
              <li
                key={id}
                style={{
                  display:
                    idx >= (currentPage + 1) * STORIES_PER_PAGE ? 'none' : ''
                }}
              >
                <NewsItem id={id} />
              </li>
            ))}
        </ol>
      </main>
    </section>
  );
};

export default News;
