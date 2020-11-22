import React from 'react'
import styled from 'styled-components';
import { theme, mixins} from '@styles';

const {fontSizes, fonts} = theme;

const Footer = () => {
    return (
        <StyledContainer>
            <StyledMetadata tabindex="-1">
            <StyledGitHubLink
                href="https://github.com/nnaji-victor/nnajivictor-me"
                target="_blank"
                rel="nofollow noopener noreferrer">
            <div>Designed &amp; Built by Nnaji Victor.</div>
          </StyledGitHubLink>
             <p>Thanks to <a href="https://brittanychiang.com/" target="_blank"
                rel="nofollow noopener noreferrer">Brittany Chiang</a> for the inspiration</p>
            </StyledMetadata>
        </StyledContainer>
    )
};

const StyledContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  min-height: 70px;
`;

const StyledMetadata = styled.div`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  line-height: 1;
`;

const StyledGitHubLink = styled.a`
  color: var(--primary-color);
  padding: 10px;
`;

export default Footer
