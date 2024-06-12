import React from 'react';
import Previuos from "../icons/prev.svg";

function PreviuosButton({onClick})
{

    return (
        <div className='playButton' onClick={onClick}>
            <Previuos/>
        </div>
    );
}

export default PreviuosButton;