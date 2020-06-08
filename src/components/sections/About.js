import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import AnimatedHeading from '../AnimatedHeading';
import SectionHeading from '../SectionHeading';
import sr from "../../utils/sr";
import { theme, mixins, media, Section, Heading } from '@styles';
import { github } from '@config';
const {srConfig, colors, fontSizes, fonts} = theme;

const About = ({data}) => {
    const { frontmatter, html } = data[0].node;
    const { title, skills, avatar } = frontmatter;

    const revealContainer = useRef(null);
    useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

    return (
        <StyledContainer id="about" ref={revealContainer}>
            <AnimatedHeading>
                <SectionHeading text={title} />
            </AnimatedHeading>

            <StyledFlexContainer>
               <StyledContent>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                  <SkillsContainer>
                    {skills && skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
                </SkillsContainer>
               </StyledContent>
            </StyledFlexContainer>
        </StyledContainer>
    )
}

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;

const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;

const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  overflow: hidden;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  /* color: ${colors.slate}; */
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: var(--secondary-color);
    font-size: ${fontSizes.sm};
    line-height: 12px;
  }
`;

export default About;
