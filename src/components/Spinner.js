import styled from 'styled-components';

const Spinner = styled.div`
  border-radius: 50%;
  box-shadow: inset 0 0 0 1em;
  color: ${props => props.theme.accentColor};
  font-size: 11px;
  height: 10em;
  margin: 55px auto;
  position: relative;
  text-indent: -99999em;
  transform: translateZ(0);
  width: 10em;

  &:before,
  &:after {
    border-radius: 50%;
    content: '';
    position: absolute;
  }
  &:before {
    animation: load2 2s infinite ease 1.5s;
    background: ${props => props.theme.lightAccentColor};
    border-radius: 10.2em 0 0 10.2em;
    left: -0.1em;
    height: 10.2em;
    top: -0.1em;
    transform-origin: 5.1em 5.1em;
    width: 5.2em;
  }
  &:after {
    animation: load2 2s infinite ease;
    background: ${props => props.theme.lightAccentColor};
    border-radius: 0 10.2em 10.2em 0;
    height: 10.2em;
    left: 4.9em;
    top: -0.1em;
    transform-origin: 0.1em 5.1em;
    width: 5.2em;
  }
  @-webkit-keyframes load2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load2 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
