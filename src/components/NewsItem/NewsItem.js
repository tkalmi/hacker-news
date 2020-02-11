import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const NewsItem = ({ id }) => {
  useFirebaseConnect(`v0/item/${id}`);

  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[id]);
  // const story = {};

  // return <span>Foobar</span>;

  if (!isLoaded(story)) {
    return 'Loading...';
  }

  return (
    <article>
      <h1>
        <a href={story.url}>{story.title}</a>
      </h1>
    </article>
  );
};

export default NewsItem;
