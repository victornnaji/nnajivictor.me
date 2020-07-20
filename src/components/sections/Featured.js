import React, { useState, useRef, useEffect } from 'react'
import { Section, theme, mixins, media,  } from '../../styles';
import styled from 'styled-components';
import sr from "../../utils/sr";
import Img from 'gatsby-image';
import AnimatedHeading from '../AnimatedHeading';
import SectionHeading from '../SectionHeading';
import ScrollAnimation from 'react-animate-on-scroll';
import { FormattedIcon } from '@components/icons';

const {srConfig,fontSizes, fonts, colors} = theme;


const Featured = ({data}) => {
    const projects = data.filter(({ node }) => node);
    const [state, setState] = useState(false);

    const revealProjects = useRef([]);
    const revealTitle = useRef(null);

    useEffect(() => {
        sr.reveal(revealTitle.current, srConfig());
        revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
      }, []);


    return (
        <StyledContainer id="projects">
             <ScrollAnimation animateIn="lol"
            animateOnce={true}
            duration={0}
            afterAnimatedIn = {function afterAnimatedIn(v){
              setState(v.onScreen)
            }}>
            <AnimatedHeading animate={state}>
                <SectionHeading text={'Projects'} />
            </AnimatedHeading>
          </ScrollAnimation>


          <div>
              {projects && projects.map( ({node}, i) => {
                  const { frontmatter, html } = node;
                  const { external, title, tech, github, avatar } = frontmatter;

                  return(
                    <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                        <StyledContent>
                           <StyledLabel>Featured Project</StyledLabel>
                           <StyledProjectName>
                                {external ? (
                                <a
                                    href={external}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    aria-label="External Link">
                                    {title}
                                </a>
                                ) : (
                                title
                                )}
                            </StyledProjectName>
                            <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />
                            {tech && (
                                <StyledTechList>
                                {tech.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                                </StyledTechList>
                            )}
                            <StyledLinkWrapper>
                            {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="GitHub Link">
                                <FormattedIcon name="GitHub" />
                            </a>
                            )}
                            {external && (
                            <a
                                href={external}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="External Link">
                                <FormattedIcon name="External" />
                            </a>
                            )}
                        </StyledLinkWrapper>
                        </StyledContent>
                        <StyledImgContainer
                            href={external ? external : github ? github : '#'}
                            target="_blank"
                            rel="nofollow noopener noreferrer">
                            <StyledFeaturedImg fluid={avatar.childImageSharp.fluid} alt={title} width="100%"/>
                        </StyledImgContainer>
                    </StyledProject>
                  )
              })}
          </div>
        </StyledContainer>
    )
}

const StyledContainer = styled(Section)`
    flex-direction: column;
    display: flex;
    padding-top: 300px;
    position: relative;
`;

const StyledContent = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  `};
  ${media.phablet`padding: 30px 25px 20px;`};
`;

const StyledLabel = styled.h4`
  font-size: ${fontSizes.smish};
  font-weight: normal;
  color: var(--secondary-color);
  font-family: ${fonts.SFMono};
  margin-top: 10px;
  padding-top: 0;
`;

const StyledProjectName = styled.h5`
  font-size: 28px;
  margin: 0 0 20px;
  color: var(--primary-color);
  ${media.tablet`font-size: 24px;`};
  ${media.thone`color: '#fff'`};
  a {
    ${media.tablet`display: block;`};
  }
`;

const StyledDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 2;
  padding: 25px;
  background-color: ${colors.lightNavy};
  color: ${colors.lightSlate};
  font-size: ${fontSizes.lg};
  border-radius: ${theme.borderRadius};
  ${media.thone`
    background-color: transparent;
    color: var(--primary-color);
    padding: 20px 0;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  `};
  p {
    margin: 0;
  }
  a {
    ${mixins.inlineLink};
  }
`;

const StyledTechList = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 25px 0 10px;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: var(--primary-color);
    margin-right: ${theme.margin};
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    ${media.thone`
      color: var(--primary-color);
      margin-right: 10px;
    `};
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: var(--primary-color);
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const StyledFeaturedImg = styled(Img)`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  border-radius: ${theme.borderRadius};
  position: relative;
  mix-blend-mode: multiply;
  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
    filter: grayscale(100%) contrast(1) brightness(80%);
  `};
`;

const StyledImgContainer = styled.a`
  ${mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  border-radius: ${theme.radius + 1}px;
  transition: ${theme.transition};
  ${media.tablet`height: 100%;`};
  ${media.thone`
    grid-column: 1 / -1;
    opacity: 0.25;
  `};
  &:hover,
  &:focus {
    background: transparent;
    &:before,
    ${StyledFeaturedImg} {
      background: transparent;
      filter: none;
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    background-color: ${colors.navy};
    mix-blend-mode: screen;
  }
`;

const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-top: 30px;
  margin-bottom: 100px;
  ${media.thone`
    margin-bottom: 70px;
  `};
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(odd) {
    ${StyledContent} {
      grid-column: 7 / -1;
      text-align: right;
      ${media.thone`
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      `};
      ${media.phablet`padding: 30px 25px 20px;`};
    }
    ${StyledTechList} {
      justify-content: flex-end;
      li {
        margin-left: ${theme.margin};
        margin-right: 0;
      }
    }
    ${StyledLinkWrapper} {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    ${StyledImgContainer} {
      grid-column: 1 / 8;
      ${media.tablet`height: 100%;`};
      ${media.thone`
        grid-column: 1 / -1;
        opacity: 0.25;
      `};
    }
  }
`;


export default Featured
