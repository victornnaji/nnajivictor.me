import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Section, theme, mixins, media, Button,  } from '../../styles';
import sr from "../../utils/sr";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { FormattedIcon } from '@components/icons';

const {srConfig,fontSizes, fonts } = theme;

const Projects = ({data}) => {
    const [showMore, setShowMore] = useState(false);
    const revealTitle = useRef(null);
    const revealProjects = useRef([]);
    
    useEffect(() => {
        sr.reveal(revealTitle.current, srConfig());
        revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
      }, []);

    const GRID_LIMIT = 6;
    const projects = data.filter(({ node }) => node);
    const firstSix = projects.slice(0, GRID_LIMIT);
    const projectsToShow = showMore ? projects : firstSix;

    return (
        <StyledContainer>
            <StyledTitle ref={revealTitle}>Other Projects</StyledTitle>
            <StyledGrid>
                <TransitionGroup className="projects">
                {projectsToShow &&
                    projectsToShow.map(({ node }, i) => {
                    const { frontmatter, html } = node;
                    const { github, external, title, tech } = frontmatter;
                    return (
                        <CSSTransition
                        key={i}
                        classNames="fadeup"
                        timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                        exit={false}>
                        <StyledProject
                            key={i}
                            ref={el => (revealProjects.current[i] = el)}
                            tabIndex="0"
                            style={{
                            transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                            }}>
                            <StyledProjectInner>
                            <header>
                                <StyledProjectHeader>
                                <StyledFolder>
                                    <FormattedIcon name="Folder" />
                                </StyledFolder>
                                <StyledProjectLinks>
                                    {github && (
                                    <StyledIconLink
                                        href={github}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        aria-label="GitHub Link">
                                        <FormattedIcon name="GitHub" />
                                    </StyledIconLink>
                                    )}
                                    {external && (
                                    <StyledIconLink
                                        href={external}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        aria-label="External Link">
                                        <FormattedIcon name="External" />
                                    </StyledIconLink>
                                    )}
                                </StyledProjectLinks>
                                </StyledProjectHeader>
                                <StyledProjectName>{title}</StyledProjectName>
                                <StyledProjectDescription dangerouslySetInnerHTML={{ __html: html }} />
                            </header>
                            <footer>
                                {tech && (
                                <StyledTechList>
                                    {tech.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                    ))}
                                </StyledTechList>
                                )}
                            </footer>
                            </StyledProjectInner>
                        </StyledProject>
                        </CSSTransition>
                    );
                    })}
                </TransitionGroup>
            </StyledGrid>

           {projects.length > 6 ? 
           ( <StyledMoreButton onClick={() => setShowMore(!showMore)}>
                Show {showMore ? 'Less' : 'More'}
            </StyledMoreButton>)
        : (null)}
        </StyledContainer>
    )
}

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  margin-top: 150px;
  ${media.tablet`margin-top: 0px; padding-top: 0px`}
`;
const StyledTitle = styled.h4`
  margin: 0 auto;
  font-size: ${fontSizes.h3};
  ${media.tablet`font-size: 24px;`};
  a {
    display: block;
  }
`;

const StyledGrid = styled.div`
  margin-top: 50px;
  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`;

const StyledProjectInner = styled.div`
  ${mixins.boxShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: var(--tertiary-color);
`;
const StyledProject = styled.div`
  transition: ${theme.transition};
  cursor: default;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledProjectInner} {
      transform: translateY(-5px);
    }
  }
`;
const StyledProjectHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`;
const StyledFolder = styled.div`
  color: var(--secondary-color);
  svg {
    width: 40px;
    height: 40px;
  }
`;
const StyledProjectLinks = styled.div`
  margin-right: -10px;
  color: inherit;
`;
const StyledIconLink = styled.a`
  position: relative;
  top: -10px;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const StyledProjectName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: var(--primary-color);
`;
const StyledProjectDescription = styled.div`
  font-size: 17px;
  color: var(--primary-color);
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTechList = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    color: var(--primary-color);
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const StyledMoreButton = styled(Button)`
  margin: 100px auto 0;
`;


export default Projects
