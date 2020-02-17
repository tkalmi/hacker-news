import React, { useState } from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

import Author from '../Author';
import { addBlockQuotes, ensureHonestLinks } from '../../utils';
import PublishTime from '../PublishTime';
import CommentList from './CommentList';
import Separator from '../Separator';

const COMMENT_COLORS = ['lime', 'red', 'orange', 'yellow'];

const CommentContainer = styled.article`
  border-top: 1px solid lightgray;
  padding-top: 10px;
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
    left: -10px;
    position: absolute;
    top: 0;
    width: 3px;
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
    return 'Loading...';
  }

  return (
    <CommentContainer>
      <CommentDetails depth={depth}>
        <header>
          <Author author={comment.by}>
            {comment.by === originalPoster && `${comment.by} [OP]`}
          </Author>
          <Separator />
          <PublishTime time={comment.time} />
          {comment.kids?.length && showMore && (
            <button onClick={toggleCollapse}>
              {isCollapsed ? '+ Show Thread' : '- Collapse Thread'}
            </button>
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
          <button onClick={handleShowMore}>More</button>
        ) : (
          <CommentList style={isCollapsed ? { display: 'none' } : {}}>
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
