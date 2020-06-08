import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mixins, media, theme } from '../../styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AnimatedImage, { AnimatedScroll } from '../AnimatedImage';
import { Link } from 'gatsby';

const {fontSizes, fonts, navDelay, loaderDelay } = theme;

const Hero = ({data}) => {
    const {frontmatter, html} = data[0].node;

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), navDelay);
        return () => clearTimeout(timeout);
      }, []);

      const one = () => (
        <StyledOverline style={{ transitionDelay: '100ms' }}>{frontmatter.intro}</StyledOverline>
      );
      const two = () => (
        <StyledTitle style={{ transitionDelay: '200ms' }}>{frontmatter.name}.</StyledTitle>
      );
      const three = () => (
        <StyledSubtitle style={{ transitionDelay: '300ms' }}>{frontmatter.title}</StyledSubtitle>
      );

      const four = () => (
        <StyledDescription
          style={{ transitionDelay: '400ms' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );

      const items = [one, two, three, four];

    return (
        <StyledFragment>
            <StyledContainer>
                <StyledContent>
                    <TransitionGroup component={null}>
                        {isMounted && items.map( (item, i) => (
                            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                                {item}
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </StyledContent>

                <StyledSVG>
                    <TransitionGroup component={null}>
                        {isMounted && (
                            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                            <div style={{ transitionDelay: '600ms' }}>
                                 <AnimatedImage />
                            </div>
                        </CSSTransition>
                        )}
                    </TransitionGroup>
                </StyledSVG>
            </StyledContainer>

            <StyledScroll to="/#about">
                <TransitionGroup component={null}>
                    {isMounted && (
                        <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                            <div style={{ transitionDelay: '1000ms' }}>
                                <AnimatedScroll />
                            </div>
                       </CSSTransition>
                   )}
                </TransitionGroup>
                
            </StyledScroll>

        </StyledFragment>
    )
}

const StyledFragment = styled.div`
     
`;

const StyledScroll = styled(Link)`
    position: absolute;
    bottom: 10px;
    left: 50%;

    ${media.tablet`display: none;`}
`;

const StyledContainer = styled.div`
    ${mixins.flexBetween};
    align-items: flex-start;
    ${media.tablet`display: block`};
    min-height: 100vh;
`;

const StyledContent = styled.div`
    width: 60%;
    ${media.tablet`width: 100%;`};
    a {
        ${mixins.inlineLink};
    }
`;

const StyledSVG = styled.div`
    position: relative;
    width: 40%;
    max-width: 100%;
    margin-left: 60px;
    ${media.tablet`margin: 60px auto 0;`};
    ${media.phablet`width: 80%;`};
    a {
        &:focus {
        outline: 0;
        }
    }
`;

const StyledOverline = styled.div`
  color: var(--secondary-color);
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;

const StyledTitle = styled.h2`
  font-size: 75px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;

const StyledSubtitle = styled.h3`
  font-size: 50px;
  line-height: 1.1;
  color: var(--heading-color);
  ${media.desktop`font-size: 42px;`};
  ${media.tablet`font-size: 42px;`};
  ${media.phablet`font-size: 40px;`};
  ${media.phone`font-size: 30px;`};
`;

const StyledDescription = styled.div`
  margin-top: 25px;
  width: 70%;
  ${media.tablet`width: 100%;`};
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;


export default Hero
