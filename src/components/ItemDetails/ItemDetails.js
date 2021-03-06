import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

import { ACTIONS } from '../../store';
import { addBlockQuotes, ensureHonestLinks } from '../../utils';
import Comment from './Comment';
import CommentList from './CommentList';
import StoryDetailsFooter from '../StoryDetailsFooter';
import Spinner from '../Spinner';

const SectionWrapper = styled.section`
  padding: 15px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 20px 20px 60px #d8d9d9, -20px -20px 60px #ffffff;
  height: 100%;
  margin: 0 -10px;
`;

const SpinnerSection = styled.section`
  margin-top: 10px;
`;

const StoryDescription = styled.p`
  background-color: ${(props) => props.theme.lightAccentColor};
  padding: 0 5px;
`;

const ItemDetails = (props) => {
  // Get item id from URL params
  const { itemId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LAST_ITEM_ID, item: parseInt(itemId, 10) });
  }, [dispatch, itemId]);

  useFirebaseConnect(`v0/item/${itemId}`);
  // Fetch story
  const story = useSelector((state) => state.firebase.data.v0?.item?.[itemId]);

  if (!isLoaded(story)) {
    return (
      <SpinnerSection>
        <Spinner />
      </SpinnerSection>
    );
  }

  return (
    <SectionWrapper>
      <header>
        <h2>
          {story.url ? (
            <a href={story.url} rel="noreferrer noopener">
              {story.title}
            </a>
          ) : (
            story.title
          )}
        </h2>
        <StoryDetailsFooter {...story} item={undefined} compact={true} />

        {story.text && (
          <StoryDescription
            dangerouslySetInnerHTML={{
              __html: story.deleted
                ? '[DELETED]'
                : addBlockQuotes(ensureHonestLinks(sanitizeHtml(story.text))),
            }}
          ></StoryDescription>
        )}
      </header>

      <div>
        <h3>{story.kids ? 'Comments' : 'No Comments Yet...'}</h3>

        {story.kids && (
          <CommentList role="tree">
            {story.kids.map((kid) => (
              <li key={kid} role="treeitem">
                <Comment item={kid} originalPoster={story.by} />
              </li>
            ))}
          </CommentList>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ItemDetails;
