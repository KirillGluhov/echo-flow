import React, {useState, useEffect} from 'react';
import CardMusic from './CardMusic.jsx';
import LetterCircle from './LetterCircle.jsx';
import { useAlbum } from '../contexts/AlbumContext.jsx';


function MiddlePart({files})
{
    const {isAlbum, setAlbum} = useAlbum();

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