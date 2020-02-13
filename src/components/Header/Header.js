import React from 'react';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { path: '/', label: 'Top' },
  { path: '/newstories', label: 'New' },
  { path: '/beststories', label: 'Best' }
];

const Header = props => {
  return (
    <header>
      <nav>
        <ul>
          {LINKS.map(link => (
            <li key={link.path}>
              <NavLink to={link.path} activeClassName="active">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
