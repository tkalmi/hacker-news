import styled from 'styled-components';

const Spinner = styled.div`
  animation: load1 1s infinite ease-in-out;
  animation-delay: -0.16s;
  background: ${props => props.theme.accentColor};
  color: ${props => props.theme.accentColor};
  font-size: 11px;
  height: 4em;
  margin: 88px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 1em;

  &:before,
  &:after {
    animation: load1 1s infinite ease-in-out;
    background: ${props => props.theme.accentColor};
    height: 4em;
    width: 1em;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
  }
  &:before {
    animation-delay: -0.32s;
    left: -1.5em;
  }
  &:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;

export default Spinner;
