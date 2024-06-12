import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Player from './Player.jsx';
import MiddlePart from './MiddlePart.jsx';
import { AudioProvider } from '../contexts/AudioContext.jsx';
import { SearchProvider } from '../contexts/SearchContext.jsx';

function MainPage() 
{
    const [files, setFiles] = useState([]);

    const handleFilesChange = (audioFiles) => {
        setFiles(audioFiles);
    };

    return (<>
    <SearchProvider>
        <AudioProvider>
            <Navbar onFilesChange={handleFilesChange}/>
            <MiddlePart files={files}/>
            <Player/>
        </AudioProvider>
    </SearchProvider>
    </>);
}

export default MainPage;