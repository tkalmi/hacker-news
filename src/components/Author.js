import React from 'react';
import { Link } from 'react-router-dom';

const Author = ({ author, label }) => (
  <address>
    <Link rel="author" to={`/user/${author}`}>
      {label || author}
    </Link>
  </address>
);

export default Author;
