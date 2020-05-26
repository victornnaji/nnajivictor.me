import React, {useEffect, useState} from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { theme, mixins } from '@styles';
import LoaderIcon from './icons/Loader';
import anime from 'animejs';

const Loading = ({finishLoading}) => {

    const animate = () => {
        const loader = anime.timeline({
          complete: () => finishLoading(),
        });

        var ml4 = {};
        ml4.opacityIn = [0,1];
        ml4.scaleIn = [0.2, 1];
        ml4.scaleOut = 5;
        ml4.durationIn = 100;
        ml4.durationOut = 1000;
        ml4.delay = 500;

        loader
        .add({
            targets: '.ml4 .letters-1',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
          }).add({
            targets: '.ml4 .letters-1',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: "easeInExpo",
            delay: ml4.delay
          }).add({
            targets: '.ml4 .letters-2',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
          })
          
          .add({
            targets: '.ml4 .letters-2',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: "easeInExpo",
            delay: ml4.delay
          })
          .add({
            targets: '.ml4 .letters-3',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
          }).add({
            targets: '.ml4 .letters-3',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: "easeInExpo",
            delay: ml4.delay
          })
          .add({
            targets: '.ml4',
            opacity: 0,
            duration: 500,
            delay: 500
          });

    }

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        animate();
        return () => clearTimeout(timeout);
      }, []);


    return (
        <StyledContainer className="loader">
            {/* <Helmet bodyAttributes={{ class: `hidden` }} />z */}
            <StyledLogo isMounted={isMounted}>
               <LoaderIcon />
            </StyledLogo>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
`

const StyledLogo = styled.div`
  .ml4 {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ml4 .letters {
    position: absolute;
    opacity: 0;
    color: var(--secondary-color);
  }
`

export default Loading
