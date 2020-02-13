import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Author from '../Author';
import PublishTime from '../PublishTime';
import { extractHostname } from '../../utils';

const NewsItem = ({ id }) => {
  useFirebaseConnect(`v0/item/${id}`);

  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[id]);

  if (!isLoaded(story)) {
    return 'Loading...';
  }

  if (!story) {
    return null;
  }

  return (
    <article>
      <header>
        <h1>
          <a href={story.url || `/item/${id}`}>{story.title}</a>
          {extractHostname(story.url) && (
            <small>({extractHostname(story.url)})</small>
          )}
        </h1>
      </header>
      <footer>
        {story.score} Points by
        <Author author={story.by} />
        <PublishTime time={story.time} /> |
        <Link to={`/item/${id}`}>{story.descendants} comments</Link>
      </footer>
    </article>
  );
};

export default NewsItem;
