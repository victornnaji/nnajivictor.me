import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import AnimatedHeading from '../AnimatedHeading';
import SectionHeading from '../SectionHeading';
import Img from 'gatsby-image';
import sr from "../../utils/sr";
import { theme, mixins, media, Section} from '@styles';
import { github } from '@config';
import ScrollAnimation from 'react-animate-on-scroll';
import Avatar from '../Avatar';
import { ShowOnDesktop, ShowOnMobile } from '../../styles';


const {srConfig,fontSizes, fonts} = theme;

const About = ({data}) => {
    const { frontmatter, html } = data[0].node;
    const { title, skills, avatar} = frontmatter;

    const [state, setState] = useState(false);
    const revealContainer = useRef(null);

    useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

    return (
        <StyledContainer id="about">

          <ScrollAnimation animateIn="lol"
            animateOnce={true}
            duration={0}
            afterAnimatedIn = {function afterAnimatedIn(v){
              setState(v.onScreen)
            }}>
            <AnimatedHeading animate={state}>
                <SectionHeading text={title} />
            </AnimatedHeading>
          </ScrollAnimation>

            <StyledFlexContainer ref={revealContainer}>
               <StyledContent>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                  <SkillsContainer>
                    {skills && skills.map((skill, i) => <Skill key={i}>{skill}</Skill>)}
                </SkillsContainer>
               </StyledContent>

               <StyledPic>

                  <ShowOnDesktop>
                    <Avatar photo={avatar.childImageSharp.fluid.src} href={github} width="100%"/>
                  </ShowOnDesktop>

                  <ShowOnMobile>
                    <StyledAvatarLink href={github}>
                       <StyledAvatar fluid={avatar.childImageSharp.fluid} alt="Avatar" />
                    </StyledAvatarLink>
                  </ShowOnMobile>
               
              </StyledPic>

            </StyledFlexContainer>
        </StyledContainer>
    )
}

const StyledContainer = styled(Section)`
  position: relative;
  padding-top: 10px;
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
  &:before {
    content: '+';
    position: absolute;
    left: 0;
    color: var(--secondary-color);
    font-size: ${fontSizes.sm};
    line-height: 12px;
  }
`;

const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled(Img)`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition}; 
`;
  const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  margin-left: -20px;
  &:hover,
  &:focus {
    background: transparent;
    &:after {
      top: 15px;
      left: 15px;
    }
    ${StyledAvatar} {
      filter: none;
      mix-blend-mode: normal;
    }
  }
`;


export default About;
