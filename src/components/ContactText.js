import React from 'react'
import styled from 'styled-components'

const ContactText = ({text}) => {
    return (
        <StyledContactText>
            <div className="ml13">
                <span className="text-wrapper">
                    <span className="letters">
                        {text.split('').map((char, index) => (
                            <span className='letter' aria-hidden="true" key={index}>
                                {char === ' ' ? char = '\u00A0' : char}
                            </span>
                        ))}
                    </span>
                </span>
            </div>
        </StyledContactText>
    )
}

const StyledContactText = styled.div `
`;

export default ContactText
