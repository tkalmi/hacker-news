import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

import { addBlockQuotes, ensureHonestLinks } from '../../utils';
import Comment from '../Comment/Comment';
import CommentList from '../Comment/CommentList';
import StoryDetailsFooter from '../StoryDetailsFooter';

const StoryDescription = styled.p`
  background-color: ${props => props.theme.lightAccentColor};
  padding: 0 5px;
`;

const ItemDetails = props => {
  // Get item id from URL params
  const { itemId } = useParams();

  useFirebaseConnect(`v0/item/${itemId}`);
  // Fetch story
  const { id, ...story } = useSelector(
    state => state.firebase.data.v0?.item?.[itemId]
  );

  if (!isLoaded(story)) {
    return 'Loading...';
  }

  return (
    <section>
      <header>
        <h1>
          {story.url ? <a href={story.url}>{story.title}</a> : story.title}
        </h1>
        <StoryDetailsFooter {...story} compact={true} />

        {story.text && (
          <StoryDescription
            dangerouslySetInnerHTML={{
              __html: story.deleted
                ? '[DELETED]'
                : addBlockQuotes(ensureHonestLinks(sanitizeHtml(story.text)))
            }}
          ></StoryDescription>
        )}
      </header>

      {story.kids && (
        <main>
          <h2>Comments</h2>

          <CommentList>
            {story.kids.map(kid => (
              <li key={kid}>
                <Comment id={kid} originalPoster={story.by} />
              </li>
            ))}
          </CommentList>
        </main>
      )}
    </section>
  );
};

export default ItemDetails;
