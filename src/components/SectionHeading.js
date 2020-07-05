import React from 'react'
import styled from 'styled-components';
import { Heading, media } from '../styles';

const SectionHeading = ({text}) => {
    return (
        <MHeading content={text}>
            <StyledHead className="ml9">
                <span className="text-wrapper">
                    <span className="letters">
                        {text.split('').map((char, index) => (
                            <span className='letter' aria-hidden="true" key={index}>
                                {char === ' ' ? char = '\u00A0' : char}
                            </span>
                        ))}
                    </span>
                </span>
            </StyledHead>
        </MHeading>
    )
}

const StyledHead = styled.div`
    .letter {
        transform-origin: 50% 100%;
        display: inline-block;
        line-height: 1em;
    }
`;

const MHeading = styled(Heading)`
    &::before {
        content: "${props => props.content}";
        position: absolute;
        opacity: 0.06;
        font-size: 150px;
        top: -65px;
        left: 0;
        width: 100%;
        text-transform: uppercase;
        overflow: hidden;
        ${media.tablet`font-size: 120px;`}
    }
`;
export default SectionHeading;
