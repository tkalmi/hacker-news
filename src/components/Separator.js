import styled from 'styled-components';

const Separator = styled.span`
  padding: 0 8px;
  position: relative;

  &::after {
    background: ${props => props.theme.lightFontColor};
    border-radius: 50%;
    content: '';
    height: 4px;
    position: absolute;
    top: 0.7em; // Taking line-height into account
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
  }
`;

export default Separator;
