import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

import Logo from './favicon-128.png';
import Container from '../Container';

const LINKS = [
  { path: '/', label: 'Top' },
  { path: '/newstories', label: 'New' },
  { path: '/beststories', label: 'Best' },
  { path: '/showstories', label: 'Show' },
  { path: '/askstories', label: 'Ask' },
  { path: '/jobstories', label: 'Job' }
];

const HeaderElement = styled.header`
  background: ${props => props.theme.accentColor};
  padding: 5px 0;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const NavBar = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  h1 {
    margin: 0 20px 0 0;
    font-size: ${props => props.theme.normalFontSize};
    white-space: nowrap;
  }

  h1 img {
    height: ${props => props.theme.normalFontSize};
    margin-right: 5px;
    width: ${props => props.theme.normalFontSize};
  }

  .github {
    color: ${props => props.theme.githubColor} !important;
  }
`;

const LinkList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    font-size: ${props => props.theme.normalFontSize};
    padding: 4px 8px;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  .active {
    background-color: white !important;
  }
`;

const Header = props => {
  return (
    <HeaderElement>
      <Container>
        <NavBar aria-label="Navigate between different lists of stories">
          <h1>
            <img src={Logo} aria-hidden="true" alt="" />
            Hacker News
          </h1>
          <LinkList>
            {LINKS.map(link => (
              <li key={link.path}>
                <NavLink exact to={link.path} activeClassName="active">
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                className="github"
                href="https://github.com/tkalmi/hacker-news"
                title="See the source code on github.com"
              >
                <FaGithub aria-label="Github logo" />
              </a>
            </li>
          </LinkList>
        </NavBar>
      </Container>
    </HeaderElement>
  );
};

export default Header;
