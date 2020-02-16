import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import Author from '../Author';
import Comment from '../Comment/Comment';
import PublishTime from '../PublishTime';

const ItemDetails = props => {
  // Get item id from URL params
  const { itemId } = useParams();

  useFirebaseConnect(`v0/item/${itemId}`);
  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[itemId]);

  if (!isLoaded(story)) {
    return 'Loading...';
  }

  return (
    <section>
      <header>
        <h1>
          {story.url ? <a href={story.url}>{story.title}</a> : story.title}
        </h1>
        <footer>
          {story.score} Points by
          <Author author={story.by} />
          <PublishTime time={story.time} /> | {story.descendants} comments
        </footer>
      </header>

      {story.kids && (
        <main>
          <h2>Comments</h2>

          <ul>
            {story.kids.map(kid => (
              <li key={kid}>
                <Comment id={kid} originalPoster={story.by} />
              </li>
            ))}
          </ul>
        </main>
      )}
    </section>
  );
};

export default ItemDetails;
