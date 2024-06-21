import React, { useState } from 'react';
import { useAudio } from '../contexts/AudioContext.jsx';
import { useAlbum } from '../contexts/AlbumContext.jsx';
import { useMusic } from '../contexts/MusicContext.jsx';

function ChooseFolders({ onFilesChange })
{
    const {isAlbum, setAlbum} = useAlbum();
    const {audioData, addAudioData, clearAudioData} = useMusic();

    const [files, setFiles] = useState([]);
    const {
        currentAudio, setCurrentAudio, 
        metadataCurrent, setMetadataCurrent, 
        playNow, setPlayNow,
        currentPhoto, setCurrentPhoto,
        filename, setFilename,
        currentIndex, setCurrentIndex,
        shuffle, setShuffle
    } = useAudio();

    const handleChoose = (event) => {
        
        console.log(event.target.files);

        const files = event.target.files;
        console.log(files)
        const audioFiles = Array.from(files).filter(file => file.type.startsWith('audio'));
        setFiles(audioFiles);
        onFilesChange(audioFiles);
    }

    const handleClick = () => {
        setFiles([]);
        onFilesChange([])
        setCurrentAudio(null);
        setMetadataCurrent(null);
        setPlayNow(false);
        setCurrentPhoto(null);
        setFilename(null);
        setCurrentIndex(null);
        setShuffle(false);
        clearAudioData();
        setAlbum(false);

        document.getElementById('fileURL').click();
    };

    return (
        <div className='chooseFolders' onClick={handleClick}>
            <p>Choose folders</p>
            <input type="file" webkitdirectory="true" id="fileURL" onChange={handleChoose} style={{ display: 'none' }}/>
        </div>
    )
}

export default ChooseFolders;