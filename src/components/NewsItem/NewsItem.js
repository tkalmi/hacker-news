import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Author from '../Author';
import PublishTime from '../PublishTime';
import { extractHostname } from '../../utils';

const Article = styled.article`
  background: #feffff;

  box-shadow: 20px 20px 60px #d8d9d9, -20px -20px 60px #ffffff;

  margin-bottom: 10px;
  padding: 5px 20px 15px;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  font-size: ${props => props.theme.smallFontSize};
  line-height: 1.3;
  margin-bottom: 8px;

  .hostname {
    font-size: ${props => props.theme.normalFontSize};
  }
`;

const Index = styled.span`
  align-items: center;
  border: 1px solid gray;
  border-radius: 50%;
  display: flex;
  height: 34px;
  justify-content: center;
  margin-right: 8px;
  width: 34px;
`;

const Heading = styled.h1`
  font-size: ${props => props.theme.normalFontSize};
  line-height: 1.5;
`;

const Footer = styled.footer`
  align-items: baseline;
  display: flex;
  font-size: ${props => props.theme.normalFontSize};
  justify-content: space-between;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
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
      <Header>
        <Index>{idx}</Index>
        <div>
          <div className="hostname">{extractHostname(story.url)}</div>
          <div>
            Posted by <Author author={story.by} />
            <Separator />
            <PublishTime time={story.time} />
          </div>
        </div>
      </Header>
      <main>
        <Heading>
          <a href={story.url || `/item/${id}`}>{story.title}</a>
        </Heading>
      </main>
      <Footer>
        <span>{story.score} Points</span>
        <Link to={`/item/${id}`}>{story.descendants} comments</Link>
      </Footer>
    </Article>
  );
};

export default NewsItem;
