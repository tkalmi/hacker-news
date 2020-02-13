import React from 'react';
import { Link } from 'react-router-dom';

const Author = ({ author }) => (
  <address>
    <Link rel="author" to={`/user/${author}`}>
      {author}
    </Link>
  </address>
);

export default Author;
