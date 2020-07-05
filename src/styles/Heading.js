import styled from 'styled-components';
import theme from './theme';
import media from './media';
const { fontSizes} = theme;

const Heading = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0 40px;
  width: 100%;
  white-space: nowrap;
  font-size: ${fontSizes.h3};
  ${media.tablet`font-size: 24px;`};

  &:after {
    content: '';
    display: block;
    height: 1px;
    width: 100px;
    background-color: var(--primary-color);
    position: relative;
    top: -5px;
    margin-left: 20px;
    ${media.desktop`width: 30%`};
    ${media.thone`margin-left: 10px;`};
  }
`;

export default Heading;
