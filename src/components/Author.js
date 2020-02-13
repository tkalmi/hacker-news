import React from 'react';
import { Link } from 'react-router-dom';

const Author = ({ author, children }) => (
  <address>
    <Link rel="author" to={`/user/${author}`}>
      {children || author}
    </Link>
  </address>
);

export default Author;
