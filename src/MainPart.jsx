import React, { useState } from 'react';
import MusicCard from './components/MusicCard.jsx';

function MainPart() 
{
    const [files, setFiles] = useState([]);

    const handleChoose = (event) => {
        console.log(event.target.files);

        const files = event.target.files;
        const audioFiles = Array.from(files).filter(file => file.type.startsWith('audio'));
        setFiles(audioFiles);
    }
    return (<>
        <input type="file" webkitdirectory="true" id="fileURL" onChange={handleChoose}/>
        {
            Array.from(files).map((file, index) => (
                <MusicCard file={file} key={index}/>
            ))
        }
    </>);
}

export default MainPart;