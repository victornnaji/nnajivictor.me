import React, { useEffect } from 'react'
import styled from 'styled-components';
import anime from 'animejs';
import { theme } from '@styles';
const { fonts } = theme;

const Logo = () => {
    useEffect(() => {
        anime
          .timeline({ loop: false })
          .add({
            targets: ".ml15 .word",
            scale: [14, 1],
            opacity: [0, 1],
            easing: "easeInOutExpo",
            duration: 1000,
            delay: (el, i) => 800 * i,
          })
          .add({
            targets: ".ml15 .line",
            opacity: [0.5, 1],
            scaleX: [0, 1],
            easing: "easeInOutExpo",
            duration: 700,
          })
          .add({
            targets: ".ml15 .line",
            duration: 600,
            easing: "easeOutExpo",
            translateY: (el, i) => 0.625 + 0.625 * 2 * i + "em",
          })
    }, []);

    return (
      <LogoBox>
        <div className="ml15">
          <span className="word">N</span>
          <span className="word">V</span>
          <span className="word dot"></span>
        </div>
      </LogoBox>
    )
}

const LogoBox = styled.div`
.dot{
  width: 10px;
  height: 10px;
  background: red;
  display: inline-block;
  border-radius: 10px;
  margin-left: -5px;
}

.ml15 {
  letter-spacing: -1px;
   font-weight: 800;
  position: relative;
  font-size: 42px;
  font-family: ${fonts.SFMono};
}

.line{
  background: blue;
  height: 1.5px;
  width: 50px;
  display: inline-block;
  position: absolute;
  left: 0;
}
`;

export default Logo
