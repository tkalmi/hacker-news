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
      <StatusItem>
        <AiOutlineLike aria-hidden="true" />
        {score}
      </StatusItem>

      <StatusItem>
        <MdChatBubbleOutline aria-hidden="true" />
        <Link to={`/item/${id}`}>{descendants}</Link>
      </StatusItem>

      <StatusItem>
        <MdAccessTime aria-hidden="true" />
        <PublishTime time={time} />
      </StatusItem>
    </LineWrapper>
  );
};

export default ItemStatusLine;
