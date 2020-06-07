import React from 'react'
import Lottie from 'react-lottie';
import Developer from '../assets/hero.json';
import Scroll from '../assets/scroll.json';
import styled from 'styled-components';
import { theme } from '../styles';

const {fonts} = theme;


export const AnimatedScroll = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Scroll,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

      return (
        <StyledScroll>
             <Lottie options={defaultOptions} />
        </StyledScroll>
      )
    
}

const StyledScroll = styled.div`
font-family: ${fonts.SFMono};
    width: 8%;
    
    g{
        path{
         stroke: var(--secondary-color) !important;
         stroke-width: 40 !important;
      }
    }
`;

const AnimatedImage = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Developer,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    
    return (
        <StyledAnimation>
            <Lottie options={defaultOptions} />
        </StyledAnimation>
    )
}

const StyledAnimation = styled.div`
    div{
        svg{
            g{
                g:nth-child(21){
                    g{
                        path{
                            fill: var(--secondary-color);
                        }
                    }
                }

                g:nth-child(22){
                    g{
                        path{
                            fill: var(--secondary-color);
                        }
                    }
                }
                g:nth-child(17){
                    g{
                        path{
                            fill: var(--secondary-color);
                        }
                    }
                }
            }
        }
    }
`;

export default AnimatedImage;
