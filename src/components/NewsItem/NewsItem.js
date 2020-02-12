import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTimeDiff } from '../../utils';

const NewsItem = ({ id }) => {
  useFirebaseConnect(`v0/item/${id}`);

  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[id]);

  if (!isLoaded(story)) {
    return 'Loading...';
  }

  return (
    <article>
      <header>
        <h1>
          <a href={story.url}>{story.title}</a>
        </h1>
      </header>
      <footer>
        {story.score} Points by <address>{story.by}</address>{' '}
        <time dateTime={new Date(story.time).toString()}>
          {getTimeDiff(story.time)}
        </time>
        | <Link to={`/item/${id}`}>{story.descendants} comments</Link>
      </footer>
    </article>
  );
};

export default NewsItem;
