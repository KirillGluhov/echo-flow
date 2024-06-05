import React from 'react';
import Play from "../icons/play.svg";
import Pause from "../icons/pause.svg";

function PlayButton({audio, isPlaying, setPlaying})
{
    const handleClick = () => {
        if (isPlaying)
        {
            setPlaying(false);
            audio.pause();
        }
        else
        {
            setPlaying(true);
            audio.play();
        }
    }

    return (
        <div className='playButton' onClick={handleClick}>
            {isPlaying ? <Play/> : <Pause/>}
        </div>
    );
}

export default PlayButton;