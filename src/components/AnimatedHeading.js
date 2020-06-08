import React, { useEffect } from 'react'
import anime from 'animejs';

const AnimatedHeading = ({children}) => {

    useEffect(()=> {
        const loader = anime.timeline;

        loader({loop: false})
        .add({
            targets: '.ml9 .letter',
            scale: [0, 1],
            duration: 2500,
            elasticity: 1000,
            delay: (el, i) => 70 * (i+1)
        }).add({
            targets: '.ml9',
            opacity: 1,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        })
    },[])

    return (
        <div className='loader'>
            {children}
        </div>
    )
}

export default AnimatedHeading;
