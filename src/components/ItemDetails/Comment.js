import React, { useState } from 'react';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { FiChevronsRight, FiChevronsUp } from 'react-icons/fi';

import Author from '../Author';
import { addBlockQuotes, ensureHonestLinks } from '../../utils';
import PublishTime from '../PublishTime';
import CommentList from './CommentList';
import Separator from '../Separator';
import Loader from '../Loader';

const COMMENT_COLORS = ['lime', 'red', 'orange', 'yellow'];

const CommentContainer = styled.article`
  border-top: 1px solid lightgray;
  padding-top: 10px;

  &.collapsed {
    p,
    ul {
      display: none;
    }
  }
`;

const CommentDetails = styled.div`
  position: relative;

  &::before {
    background-color: ${props =>
      props.depth > 0
        ? COMMENT_COLORS[props.depth % COMMENT_COLORS.length]
        : 'opaque'};
    border-radius: 2px;
    content: '';
    height: 100%;
    left: -15px;
    position: absolute;
    top: 0;
    width: 3px;
  }

  > header {
    align-items: center;
    color: ${props => props.theme.lightFontColor};
    display: flex;
    font-size: ${props => props.theme.normalFontSize};
    justify-content: space-between;
    margin-bottom: 5px;
  }

  > p {
    margin-top: 4px;
  }
`;

const Button = styled.button`
  align-items: center;
  background-color: white;
  border-image: none;
  border-radius: 3px;
  display: flex;
  margin-bottom: 5px;

  &:active {
    background-color: ${props => props.theme.lightAccentColor};
  }
`;

const Comment = ({ depth = 0, id, originalPoster }) => {
  const [showMore, setShowMore] = useState(depth < 2);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useFirebaseConnect(`v0/item/${id}`);
  // Fetch comment
  const comment = useSelector(state => state.firebase.data.v0?.item?.[id]);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isLoaded(comment)) {
    return (
      <CommentContainer>
        <Loader />
      </CommentContainer>
    );
  }

  if (isEmpty(comment)) {
    return null;
  }

  return (
    <CommentContainer className={isCollapsed ? 'collapsed' : ''}>
      <CommentDetails depth={depth}>
        <header>
          <div>
            {comment.deleted ? (
              '[DELETED]'
            ) : (
              <Author author={comment.by}>
                {comment.by === originalPoster && `${comment.by} [OP]`}
              </Author>
            )}
            <Separator />
            <PublishTime time={comment.time} />
          </div>
          {comment.kids?.length && showMore && (
            <Button onClick={toggleCollapse}>
              {isCollapsed ? (
                <>
                  <FiChevronsRight aria-hidden="true" />
                  Show
                </>
              ) : (
                <>
                  <FiChevronsUp aria-hidden="true" />
                  Collapse
                </>
              )}
            </Button>
          )}
        </header>
        <p
          dangerouslySetInnerHTML={{
            __html: comment.deleted
              ? '[DELETED]'
              : addBlockQuotes(ensureHonestLinks(sanitizeHtml(comment.text)))
          }}
        ></p>
      </CommentDetails>

      {comment.kids?.length &&
        (!showMore ? (
          <Button onClick={handleShowMore}>More</Button>
        ) : (
          <CommentList>
            {comment.kids.map(kid => (
              <li key={kid}>
                <Comment
                  depth={depth + 1}
                  id={kid}
                  originalPoster={originalPoster}
                />
              </li>
            ))}
          </CommentList>
        ))}
    </CommentContainer>
  );
};

export default Comment;
