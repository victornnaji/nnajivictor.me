import React, { useEffect } from 'react'
import anime from 'animejs';

const AnimatedText = ({animate, children}) => {

    useEffect(() => {
        if(animate){
            const loader = anime.timeline;
            loader({loop: false})
            .add({
                targets: '.ml13 .letter',
                translateY: [100,0],
                translateZ: 0,
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 300 + 30 * i
              }).add({
                targets: '.ml13 .letter',
                translateY: [0,-100],
                opacity: 1,
                easing: "easeOutExpo",
                duration: 1200,
                delay: (el, i) => 100 + 30 * i
              });
        }
    }, [animate]);

    return (
        <div className='loader'>
            {children}
        </div>
    )
}

export default AnimatedText
