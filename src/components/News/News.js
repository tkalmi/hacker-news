import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';

import NewsItem from './NewsItem.js';
import Container from '../Container.js';
import Spinner from '../Spinner';
import useIntersectionObserver from '../useIntersectionObserver';

const STORIES_PER_PAGE = 30;

const News = ({ path = 'topstories' }) => {
  useFirebaseConnect(`v0/${path}`);

  const lastItemId = useSelector((state) => state.lastItemId);
  const { action: historyAction } = useHistory();
  const dispatch = useDispatch();

  // Hide Loader from screen readers if it's not in the viewport, i.e., infinite scroller is not loading more
  const [loaderRef, isLoaderVisible] = useIntersectionObserver({
    root: null,
    threshold: 0.1,
  });

  // Fetch top stories
  const storyIds = useSelector((state) => state.firebase.data.v0?.[path]);

  // Make sure that the last visible item is visible if using browser's BACK functionality
  const initialStoryCount =
    ((historyAction === 'POP' && (storyIds || []).indexOf(lastItemId)) || 0) +
    STORIES_PER_PAGE;

  const [visibleStoryCount, setVisibleStoryCount] = useState(initialStoryCount);

  useLayoutEffect(() => {
    const element = document.getElementById(lastItemId);
    if (historyAction === 'POP' && element) {
      window.scrollTo(0, element.offsetTop);
    }
  }, [dispatch, historyAction, lastItemId]);

  function loadMore() {
    setVisibleStoryCount(visibleStoryCount + STORIES_PER_PAGE);
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
    <InfiniteScroll
      initialLoad={false}
      pageStart={0}
      hasMore={visibleStoryCount < storyIds.length - 1}
      loadMore={loadMore}
      role="list"
      style={{ listStyle: 'none' }}
      loader={
        <Spinner key="spinner" ref={loaderRef} isVisible={isLoaderVisible} />
      }
    >
      {storyIds.slice(0, visibleStoryCount).map((id, idx) => (
        <li id={id} key={id}>
          <NewsItem item={id} idx={1 + idx} />
        </li>
      ))}
    </InfiniteScroll>
  );
};

export default News;
