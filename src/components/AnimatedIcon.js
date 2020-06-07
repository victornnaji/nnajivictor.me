import React from 'react';
import Lottie from 'react-lottie';

const AnimatedIcon = ({icon}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: icon,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div>
            <Lottie options={defaultOptions} />
        </div>
    )
}

export default AnimatedIcon;
