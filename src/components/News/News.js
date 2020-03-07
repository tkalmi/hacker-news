import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import NewsItem from './NewsItem.js';
import Container from '../Container.js';
import Spinner from '../Spinner';

const STORIES_PER_PAGE = 30;

const News = props => {
  const path = useLocation().pathname.replace('/', '') || 'topstories';

  const [visibleStoryRange, setVisibleStoryRange] = useState([]);

  useFirebaseConnect(`v0/${path}`);

  // Fetch top stories
  const storyIds = useSelector(state => state.firebase.data.v0?.[path]);

  function loadMore() {
    const [start, end] = visibleStoryRange;
    setVisibleStoryRange([start, end + STORIES_PER_PAGE]);
  }

  // Show spinner animation while loading
  if (!isLoaded(storyIds)) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  // Render news items in a list of NewsItem component
  return (
    <section>
      <main>
        <InfiniteScroll
          pageStart={0}
          hasMore={
            visibleStoryRange[0] > 0 ||
            visibleStoryRange[1] < storyIds.length - 1
          }
          loadMore={loadMore}
          role="list"
          style={{ listStyle: 'none' }}
          loader={<Spinner key="spinner" />}
        >
          {storyIds
            .slice(visibleStoryRange[0], visibleStoryRange[1])
            .map((id, idx) => (
              <li key={id}>
                <NewsItem id={id} idx={1 + idx} />
              </li>
            ))}
        </InfiniteScroll>
      </main>
    </section>
  );
};

export default News;
