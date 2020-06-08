import React from 'react'
import Lottie from 'react-lottie';
import Developer from '../assets/dev.json';
import Scroll from '../assets/scroll.json';
import styled from 'styled-components';
import { theme} from '../styles';

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
             <Lottie options={defaultOptions} isClickToPauseDisabled = {true}/>
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
            <Lottie options={defaultOptions} isClickToPauseDisabled = {true}/>
        </StyledAnimation>
    )
}

const StyledAnimation = styled.div`
     width: 100%;
     
    div{
        svg{
            g{
                
                g:nth-child(1){
                    g:nth-child(10){
                        path{
                            fill: var(--bg);
                        }
                    }
                }
                g:nth-child(10){
                    g:nth-child(4){
                        path{
                            fill: #c68642;
                        }
                    }

                    g:nth-child(3){
                        path{
                            fill: black;
                        }
                    }
                }
                g:nth-child(2){
                    g{
                        path{
                            fill: #c68642;
                        }
                    }
                }
            }
        }
    }
`;

export default AnimatedImage;
