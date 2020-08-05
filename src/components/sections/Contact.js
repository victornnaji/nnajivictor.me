import React, { useRef, useEffect } from 'react'
import sr from "../../utils/sr";
import { Section, theme, media,  } from '../../styles';
import styled from 'styled-components';
import ContactText from '../ContactText';
import AnimatedText from '../AnimatedText';
import ScrollAnimation from 'react-animate-on-scroll';
import { useState } from 'react';
import { FormattedIcon } from '@components/icons';

const {srConfig, fonts} = theme;

const Contact = ({data}) => {
    const {mail, codepen, github, twitter} = data[0].node.frontmatter;
    const [state, setState] = useState(false);

    const revealContainer = useRef(null);
    useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

    const ContactData = ['Want to', 'start', 'a new', 'project?'];
    const socials = [
        {
            name: "GitHub",
            link: github, 
        },
        {
            name: "Twitter",
            link: twitter,
        },
        {
            name: "Codepen",
            link: codepen
        }
    ]

    return (
         <StyledContainer id="contact" ref={revealContainer}>
            <div className="contact-text">
                {ContactData && ContactData.map( (data, i) => {
                    return (
                        <ScrollAnimation animateIn="contact-word"
                            key={i}
                            animateOnce={true}
                            duration={0}
                            delay={i * 100}
                            afterAnimatedIn = {function afterAnimatedIn(v){
                            setState(v.onScreen)
                        }}
                        >
                    <AnimatedText animate={state}>
                        <ContactText text={data}/>
                    </AnimatedText>
                    </ScrollAnimation>
                    )
                })}
                <div className="contact-subtext">
                    <ScrollAnimation animateIn="contact-word"
                            animateOnce={true}
                            duration={0}
                            delay={550}
                            afterAnimatedIn = {function afterAnimatedIn(v){
                            setState(v.onScreen)
                        }}
                        >
                        <AnimatedText animate={state}>
                            <ContactText text={'or just say hello.'}/>
                        </AnimatedText>
                    </ScrollAnimation>
                </div>
            </div>
            <div className="contact-email-section">
                <StyledMail className="mail" href={`mailto:${mail}`} target="_blank" rel="nofollow noopener noreferrer">
                    <ScrollAnimation animateIn="email"
                            animateOnce={true}
                            duration={0}
                            delay={600}
                            afterAnimatedIn = {function afterAnimatedIn(v){
                            setState(v.onScreen)
                        }}
                        >
                        <AnimatedText animate={state}>
                            <ContactText text={mail}/>
                        </AnimatedText>
                    </ScrollAnimation>
                </StyledMail>
                <StyledSocial>
                    {
                        socials && socials.map((social, i) => {
                            return (
                                <ScrollAnimation animateIn="social"
                                    key={i}
                                    animateOnce={true}
                                    duration={0}
                                    delay={600}
                                    afterAnimatedIn = {function afterAnimatedIn(v){
                                    setState(v.onScreen)
                                }}>
                                    <div className="socials">
                                        <a href={social.link}>
                                          <FormattedIcon name={social.name} />
                                            <AnimatedText animate={state}>
                                                    {social.name}
                                            </AnimatedText>
                                        </a>
                                    </div>
                                </ScrollAnimation>
                            )
                        })
                    }
                </StyledSocial>
                <div className="buy-me-cofee">
                    <a className="bmc-button" target="_blank" rel="nofollow noopener noreferrer" href="https://www.buymeacoffee.com/nnajivictor">
                        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/>
                        <span style={{marginLeft: '5px', fontSize: '19px !important'}}>Buy me a coffee</span>
                    </a>
                </div>
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled(Section)`
    padding: 200px 0 0 0;
    font-family: ${fonts.Roslindale};
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    color: var(--primary-color);
    font-size: 135px;

    ${media.desktop`font-size: 115px;`}
    ${media.tablet`font-size: 100px; width: 100%; display: block`}
    ${media.phablet`font-size: 85px; padding: 0 0;`}
    ${media.phone`font-size: 75px;`}

    .contact-text{
        color: var(--heading-color);
        line-height: 110px;
        letter-spacing: -4.32px;
        width: 50%;

        ${media.desktop`line-height: 95px;`}
        ${media.tablet`
           line-height: 65px;
           width: 100%;
           text-align: center;
           letter-spacing: 3.32px;
        `}
        ${media.thone`line-height: 65px;`}
        ${media.phone` line-height: 60px;`}
        .contact-word:nth-child(2), .contact-word:nth-child(4){
            letter-spacing: -4.32px;
            transform: translateX(50px);

            ${media.tablet`
                transform: translateX(0);
            `}
        }

        .contact-word:nth-child(4){
            ${media.tablet`margin-left: 110px;`}
            ${media.thone`margin-left: 60px;`}
        }
    }

    .contact-subtext{
        font-size: 30px;
        color: var(--heading-color);
        letter-spacing: 1.32px;
        text-align: right;

        ${media.thone`
            text-align: center;
            font-size: 22px;
            margin-left: 30px;
            margin-top: 10px;
            letter-spacing: 1.32px;
        `}
    }

    .contact-email-section{
        width: 50%;
        ${media.desktop`width: 35%`}
        font-size: 30px;
        ${media.tablet` font-size: 24px`};
        text-align: center;
        color: var(--heading-color);
        ${media.tablet`width: 100%; margin-top: 60px`}
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .buy-me-cofee{
            .bmc-button img{
                height: 34px !important;
                width: 35px !important;
                margin-bottom: 1px !important;
                box-shadow: none !important;
                border: none !important;
                vertical-align: middle !important;
            }
            .bmc-button{
                padding: 7px 15px 7px 10px !important;
                line-height: 35px !important;
                height:51px !important;
                text-decoration: none !important;
                display:inline-flex !important;
                color: var(--primary-color) !important;
                background-color: var(--tertiary-color) !important;
                border-radius: 5px !important;
                border: 1px solid transparent !important;
                padding: 7px 15px 7px 10px !important;
                font-size: 20px !important;
                letter-spacing:0.6px !important;
                margin: 0 auto !important;
                font-family:'Arial', cursive !important;
                -webkit-box-sizing: border-box !important;
                box-sizing: border-box !important;
            }
            .bmc-button:hover, .bmc-button:active, .bmc-button:focus {
                -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
                text-decoration: none !important;
                box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
                opacity: 0.85 !important;
                color: var(--primary-color) !important;
            }
        }
    }
`;

const StyledMail = styled.a`
    font-size: 30px;
    position: relative;

    ${media.tablet` font-size: 24px`};

    &:hover, &:focus, &:active{
        color: currentColor;
    }

    &::before, &::after{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid var(--primary-opacity);
        border-radius: 50%;
        content: '';
        opacity: 0;
        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
        -moz-transition: -moz-transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.3s;
        -webkit-transform: translateX(-50%) translateY(-50%) scale(0.2);
        -moz-transform: translateX(-50%) translateY(-50%) scale(0.2);
        transform: translateX(-50%) translateY(-50%) scale(0.2);
    }

    &::after{
        width: 90px;
        height: 90px;
        border-width: 6px;
        -webkit-transform: translateX(-50%) translateY(-50%) scale(0.8);
        -moz-transform: translateX(-50%) translateY(-50%) scale(0.8);
        transform: translateX(-50%) translateY(-50%) scale(0.8);
    }

    &:hover::before, &:hover::after, &:focus::before,&:focus::after{
        opacity: 1;
        -webkit-transform: translateX(-50%) translateY(-50%) scale(1);
        -moz-transform: translateX(-50%) translateY(-50%) scale(1);
        transform: translateX(-50%) translateY(-50%) scale(1);
    }
`;

const StyledSocial = styled.div`
    font-size: 20px;
    margin: 100px 0;
    display: flex;
    width: 100%;
    justify-content: center;
    font-family: ${fonts.SFMono};

    ${media.tablet` margin: 40px 0; font-size: 14px`}
    svg {
        width: 20px;
        height: 20px;
    }

    .socials{
        margin-right: 30px;
        ${media.thone`
            margin-right: 0px;
            margin-left: 30px;`
        }

    }
`;

export default Contact