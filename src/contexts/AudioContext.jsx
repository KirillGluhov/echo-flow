import React, {createContext, useContext, useRef, useState} from 'react';
import useAudioRefs from '../hooks/useAudioRefs.jsx';
import useAudioData from '../hooks/useAudioData.jsx';

const AudionContext = createContext();

/*
{
    metadata: //,
    photo: //,
    fileName: //,
    audio: //,
}
*/

export const AudioProvider = ({children}) => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [metadataCurrent, setMetadataCurrent] = useState(null);
    const [playNow, setPlayNow] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [filename, setFilename] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [shuffle, setShuffle] = useState(false);

    const [audioData, addAudioData, clearAudioData] = useAudioData([]);

    return (
        <AudionContext.Provider value={
            {
                currentAudio, setCurrentAudio, 
                metadataCurrent, setMetadataCurrent, 
                playNow, setPlayNow,
                currentPhoto, setCurrentPhoto,
                filename, setFilename,
                currentIndex, setCurrentIndex,
                shuffle, setShuffle,
                audioData, addAudioData, clearAudioData
            }
        }>
            {children}
        </AudionContext.Provider>
    )
}

export const useAudio = () => useContext(AudionContext);