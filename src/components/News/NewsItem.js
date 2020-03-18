import React from 'react';
import { useFirebaseConnect, isLoaded } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Loader from '../Loader';
import StoryDetailsFooter from '../StoryDetailsFooter';

const Article = styled.article`
  background: ${props => props.theme.cardBgColor};

  box-shadow: 20px 20px 60px #d8d9d9, -20px -20px 60px #ffffff;

  margin: 0 -10px 4px;
  padding: 5px 15px 10px;
`;

const Heading = styled.h1`
  font-size: ${props => props.theme.normalFontSize};
  line-height: 1.5;
  margin-bottom: 0;
`;

const NewsItem = ({ idx, item }) => {
  useFirebaseConnect(`v0/item/${item}`);

  // Fetch story
  const story = useSelector(state => state.firebase.data.v0?.item?.[item]);

  if (!isLoaded(story)) {
    return (
      <Article>
        <Loader />
      </Article>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <Article>
      <header>
        <Heading>
          {idx}.{' '}
          <a href={story.url || `/item/${item}`} rel="noopener noreferrer">
            {story.title}
          </a>
        </Heading>
      </header>
      <StoryDetailsFooter {...story} item={item} />
    </Article>
  );
};

export default NewsItem;
