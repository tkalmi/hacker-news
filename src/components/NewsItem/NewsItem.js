import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const NewsItem = ({ id }) => {
  useFirebaseConnect(`v0/item/${id}`);

  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[id]);

  const getTimeDiff = time => {
    const currentTime = new Date().getTime() / 1000;
    const diff = currentTime - time;
    if (diff < 60) {
      return `${Math.round(diff)} seconds ago`;
    } else if (diff < 3_600) {
      return `${Math.round(diff / 60)} minutes ago`;
    } else if (diff < 86_400) {
      return `${Math.round(diff / 3_600)} hours ago`;
    } else if (diff < 31_536_000) {
      return `${Math.round(diff / 86_400)} days ago`;
    }
    return `${Math.round(diff / 31_536_000)} years ago`;
  };

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
        | {story.descendants} comments
      </footer>
    </article>
  );
};

export default NewsItem;
