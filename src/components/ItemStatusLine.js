import React from 'react';
import styled from 'styled-components';
import { AiOutlineLike } from 'react-icons/ai';
import { MdChatBubbleOutline, MdAccessTime } from 'react-icons/md';
import { Link } from 'react-router-dom';

import PublishTime from './PublishTime';

const LineWrapper = styled.div`
  margin: 0 -6px;
`;

const StatusItem = styled.span`
  align-items: center;
  color: #666;
  display: inline-flex;
  margin: 0 6px;

  > svg:first-child {
    margin-right: 5px;
  }
`;

const ItemStatusLine = ({ descendants, id, score, time }) => {
  return (
    <LineWrapper>
      <StatusItem
        aria-label={`This item has ${score} point${score === 1 ? 's' : ''}`}
      >
        <AiOutlineLike aria-hidden="true" />
        {score}
      </StatusItem>

      <StatusItem
        aria-label={`This item has ${descendants} comment${
          descendants === 1 ? 's' : ''
        }`}
      >
        <MdChatBubbleOutline aria-hidden="true" />
        <Link
          to={`/item/${id}`}
          aria-label="Open to view comments and other item details"
        >
          {descendants}
        </Link>
      </StatusItem>

      <StatusItem
        aria-label={`This item was published at ${new Date(
          time * 1_000
        ).toString()}`}
      >
        <MdAccessTime aria-hidden="true" />
        <PublishTime time={time} />
      </StatusItem>
    </LineWrapper>
  );
};

export default ItemStatusLine;
