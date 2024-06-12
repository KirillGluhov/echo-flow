import React from 'react';
import Next from "../icons/next.svg";

function NextButton({onClick})
{

    return (
        <div className='playButton' onClick={onClick}>
            <Next/>
        </div>
    );
}

export default NextButton;