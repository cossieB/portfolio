import React from "react";

interface P {
    play: (e: React.MouseEvent<HTMLButtonElement>) => void
}

let buttons = [
    {
        "id": "collision",
        "childId": "Q",
        "src": "http://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg"
    },
    {
        "id": "jump",
        "childId": "W",
        "src": "http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg"
    },
    {
        "id": "shoot",
        "childId": "E",
        "src": "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav"
    },
    {
        "id": "bonus",
        "childId": "A",
        "src": "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/bonus.wav"
    },
    {
        "id": "explosion",
        "childId": "S",
        "src": "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/explosion%2001.wav"
    },
    {
        "id": "pause",
        "childId": "D",
        "src": "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav"
    },
    {
        "id": "player",
        "childId": "Z",
        "src": "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav"
    },
    {
        "id": "pop",
        "childId": "X",
        "src": "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3"
    },
    {
        "id": "eat",
        "childId": "C",
        "src": "http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatpellet.ogg"
    }
]

export default function SoundButtons(props: P) {
    return (
        <div id="buttonGrid">
            {buttons.map(item => {
                return <button onClick={props.play} key={item.id} className="drum-pad" id={item.id}>
                    {item.childId}<audio className="clip" id={item.childId} src={item.src} ></audio>
                </button>
            })}
        </div>
    )
}