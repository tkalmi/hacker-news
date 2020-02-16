import React, { useState } from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import Author from '../Author';
import { addBlockQuotes, ensureHonestLinks } from '../../utils';
import PublishTime from '../PublishTime';

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
    <article>
      <header>
        <Author author={comment.by}>
          {comment.by === originalPoster && `${comment.by} [OP]`}
        </Author>
        | <PublishTime time={comment.time} />
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

      {comment.kids?.length &&
        (!showMore ? (
          <button onClick={handleShowMore}>More</button>
        ) : (
          <ul style={isCollapsed ? { display: 'none' } : {}}>
            {comment.kids.map(kid => (
              <li key={kid}>
                <Comment
                  depth={depth + 1}
                  id={kid}
                  originalPoster={originalPoster}
                />
              </li>
            ))}
          </ul>
        ))}
    </article>
  );
};

export default Comment;
