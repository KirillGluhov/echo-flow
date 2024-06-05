import React from 'react';

function LetterCircle({letter})
{
    return (
        <div className='firstLetter'>
            <div className='letterCircle'>
                <p>{letter}</p>
            </div>
        </div>
    );
}

export default LetterCircle;