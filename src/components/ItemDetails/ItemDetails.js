import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import Comment from '../Comment/Comment';
import { getTimeDiff } from '../../utils';

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
        <h1>{story.title}</h1>
        <footer>
          {story.score} Points by
          <address>
            <Link rel="author" to={`/user/${story.by}`}>
              {story.by}
            </Link>
          </address>
          <time dateTime={new Date(story.time).toString()}>
            {getTimeDiff(story.time)}
          </time>
          | {story.descendants} comments
        </footer>
      </header>

      {story.kids && (
        <main>
          <h2>Comments</h2>

          <ul>
            {story.kids.map(kid => (
              <li key={kid}>
                <Comment id={kid} />
              </li>
            ))}
          </ul>
        </main>
      )}
    </section>
  );
};

export default ItemDetails;
