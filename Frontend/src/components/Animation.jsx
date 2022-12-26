import React from 'react';
// import animationData from '../animations/data.json'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
// import success from "../img/animation/success.json";
import iconSuccess from "../img/animation/icons8-selecionado.json";

export default function Animation() {

    return (
        <Player
            autoplay
            loop={false}
            src={iconSuccess}
            style={{ height: '100px', width: '100px' }}>
            {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
        </Player>
    )
};

