import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Author from '../Author';
import { extractHostname } from '../../utils';
import ItemStatusLine from '../ItemStatusLine';

const Article = styled.article`
  background: #feffff;

  box-shadow: 20px 20px 60px #d8d9d9, -20px -20px 60px #ffffff;

  margin-bottom: 4px;
  padding: 5px 15px 10px;
`;

const Heading = styled.h1`
  font-size: ${props => props.theme.normalFontSize};
  line-height: 1.5;
  margin-bottom: 0;
`;

const Separator = styled.span`
  padding: 0 8px;
  position: relative;

  &::after {
    background: gray;
    border-radius: 50%;
    content: '';
    height: 4px;
    position: absolute;
    top: 0.7em; // Taking line-height into account
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
  }
`;

const Footer = styled.footer`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: ${props => props.theme.normalFontSize};
  justify-content: space-between;

  > * {
    margin-top: 10px;
  }

  > .publishers {
    background: #eee;
    border-radius: 3px;
    color: #515151;
    margin-right: 10px;
    padding: 3px 5px;
  }
`;

const NewsItem = ({ id, idx }) => {
  useFirebaseConnect(`v0/item/${id}`);

  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[id]);

  if (!isLoaded(story)) {
    return 'Loading...';
  }

  if (!story) {
    return null;
  }

  return (
    <Article>
      <header>
        <Heading>
          {idx}. <a href={story.url || `/item/${id}`}>{story.title}</a>
        </Heading>
      </header>
      <Footer>
        <div className="publishers">
          {extractHostname(story.url)}
          <Separator />
          <Author author={story.by} />
        </div>
        <ItemStatusLine {...story} id={id} />
      </Footer>
    </Article>
  );
};

export default NewsItem;
