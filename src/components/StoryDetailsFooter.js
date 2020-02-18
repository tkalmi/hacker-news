import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdChatBubbleOutline, MdAccessTime } from 'react-icons/md';
import { AiOutlineLike } from 'react-icons/ai';

import { extractHostname } from '../utils';
import Separator from './Separator';
import Author from './Author';
import PublishTime from './PublishTime';

const LINE_MARGIN = '6px';

const LineWrapper = styled.div`
  margin: 0 -${LINE_MARGIN};
`;

const StatusItem = styled.span`
  align-items: center;
  color: ${props => props.theme.lightFontColor};
  display: inline-flex;
  margin: 0 ${LINE_MARGIN};

  > svg:first-child {
    margin-right: 5px;
  }
`;

const Footer = styled.footer`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: ${props => props.theme.normalFontSize};
  justify-content: ${props => (props.compact ? 'flex-start' : 'space-between')};

  > * {
    margin-top: 10px;
  }

  > .publishers {
    background: ${props => props.theme.lightBgColor};
    border-radius: 3px;
    color: ${props => props.theme.mediumFontColor};
    margin-right: 10px;
    padding: 3px 5px;
  }
`;

export default function StoryDetailsFooter({ id, compact, ...story }) {
  return (
    <Footer compact={compact}>
      <div className="publishers">
        {extractHostname(story.url)}
        <Separator />
        <Author author={story.by} />
      </div>

      <LineWrapper>
        <StatusItem
          aria-label={`This item has ${story.score} point${
            story.score === 1 ? 's' : ''
          }`}
        >
          <AiOutlineLike aria-hidden="true" />
          {story.score}
        </StatusItem>

        <StatusItem
          aria-label={`This item has ${story.descendants} comment${
            story.descendants === 1 ? 's' : ''
          }`}
        >
          <MdChatBubbleOutline aria-hidden="true" />
          {id == null ? (
            story.descendants
          ) : (
            <Link
              to={`/item/${id}`}
              aria-label="Open to view comments and other item details"
            >
              {story.descendants}
            </Link>
          )}
        </StatusItem>

        <StatusItem
          aria-label={`This item was published at ${new Date(
            story.time * 1_000
          ).toString()}`}
        >
          <MdAccessTime aria-hidden="true" />
          <PublishTime time={story.time} />
        </StatusItem>
      </LineWrapper>
    </Footer>
  );
}
