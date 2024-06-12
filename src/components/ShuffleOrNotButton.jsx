import React, {useState, useEffect, useRef} from 'react';
import Shuffle from "../icons/shuffle.svg";
import NotShuffle from "../icons/repeat.svg";

function ShuffleOrNotButton({shuffle, setShuffle})
{
    const handleClick = () => {
        setShuffle(!shuffle);
    }

    return (<div className='shuffleButton' onClick={handleClick}>
        {shuffle ? <Shuffle/> : <NotShuffle/>}
    </div>)
}

export default ShuffleOrNotButton;