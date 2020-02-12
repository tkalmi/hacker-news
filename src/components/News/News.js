import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import NewsItem from '../NewsItem/NewsItem.js';

const STORIES_PER_PAGE = 30;

const News = props => {
  useFirebaseConnect('v0/topstories');

  const [currentPage, setCurrentPage] = useState(0);

  const handleSetPage = change => () => {
    setCurrentPage(currentPage + change);
  };

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
          <button onClick={handleSetPage(-1)} disabled={currentPage === 0}>
            Prev
          </button>
          <button onClick={handleSetPage(1)}>Next</button>
        </nav>
      </header>

      <main>
        <ol start={1 + currentPage * STORIES_PER_PAGE}>
          {topStoryIds
            .slice(
              currentPage * STORIES_PER_PAGE,
              (currentPage + 1) * STORIES_PER_PAGE
            )
            .map(id => (
              <li key={id}>
                <NewsItem id={id} />
              </li>
            ))}
        </ol>
      </main>
    </section>
  );
};

export default News;
