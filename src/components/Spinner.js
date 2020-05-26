import React from 'react';
import styled from 'styled-components';

const SpinnerAnimation = styled.div`
  animation: load1 1s infinite ease-in-out;
  animation-delay: -0.16s;
  background: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.accentColor};
  font-size: 11px;
  height: 4em;
  margin: 88px auto;
  position: relative;
  text-indent: -9999em;
  transform: scaleY(1);
  width: 1em;

  &:before,
  &:after {
    animation: load1 1s infinite ease-in-out;
    background: ${(props) => props.theme.accentColor};
    content: '';
    height: 4em;
    position: absolute;
    top: 0;
    transform: scaleY(1);
    width: 1em;
  }
  &:before {
    animation-delay: -0.32s;
    left: -1.5em;
  }
  &:after {
    left: 1.5em;
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      /* box-shadow: 0 0; */
      transform: scaleY(1);
    }
    40% {
      /* box-shadow: 0 -2em; */
      transform: scaleY(1.5);
    }
  }
`;

// Per https://stackoverflow.com/a/59566339
const Spinner = ({ isVisible = true }, ref) => (
  <SpinnerAnimation
    ref={ref}
    role="progressbar"
    aria-valuetext="Loading..."
    aria-hidden={!isVisible}
    aria-busy={isVisible}
    aria-live="assertive"
    aria-valuemin="0"
    aria-valuemax="100"
  ></SpinnerAnimation>
);

export default React.forwardRef(Spinner);
