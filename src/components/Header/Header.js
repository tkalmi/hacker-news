import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { path: '/', label: 'Top' },
  { path: '/newstories', label: 'New' },
  { path: '/beststories', label: 'Best' }
];

const Header = props => {
  const currentPath = useLocation().pathname;
  return (
    <header>
      <nav>
        <ul>
          {LINKS.map(link => (
            <li
              key={link.path}
              className={link.path === currentPath ? 'active' : ''}
            >
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
