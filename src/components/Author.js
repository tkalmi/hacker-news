import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Address = styled.address`
  display: inline;
  font-style: normal;

  &.highlighted {
    background: ${props => props.theme.accentColor};
  }
`;

const Author = ({ author, children, highlighted }) => (
  <Address className={highlighted ? 'highlighted' : ''}>
    <Link rel="author" to={`/user/${author}`}>
      {children || author}
    </Link>
  </Address>
);

export default Author;
