import React, {useState} from 'react';
import CardMusic from './CardMusic.jsx';
import LetterCircle from './LetterCircle.jsx';


function MiddlePart({files})
{
    return (
        <div className='middlePart'>
        {
            Array.from(files).map((file, index) => (
                <CardMusic 
                file={file} 
                index={index}
                />
            ))
        }
        </div>
    );
}

export default MiddlePart;