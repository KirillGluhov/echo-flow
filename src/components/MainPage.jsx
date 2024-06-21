import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.jsx';
import Player from './Player.jsx';
import MiddlePart from './MiddlePart.jsx';
import { AudioProvider } from '../contexts/AudioContext.jsx';
import { SearchProvider } from '../contexts/SearchContext.jsx';
import { AlbumProvider } from '../contexts/AlbumContext.jsx';
import { MusicProvider } from '../contexts/MusicContext.jsx';

function MainPage() 
{
    const [files, setFiles] = useState([]);

    const handleFilesChange = (audioFiles) => {
        setFiles(audioFiles);
    };

    return (<>
    <SearchProvider>
        <AlbumProvider>
            <AudioProvider>
                <MusicProvider>
                    <Navbar onFilesChange={handleFilesChange}/>
                    <MiddlePart files={files}/>
                    <Player/>
                </MusicProvider>
            </AudioProvider>
        </AlbumProvider>
    </SearchProvider>
    </>);
}

export default MainPage;