import React, {createContext, useContext, useRef, useState} from 'react';

const AudionContext = createContext();

export const AudioProvider = ({children}) => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const [metadataCurrent, setMetadataCurrent] = useState(null);
    const [playNow, setPlayNow] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [filename, setFilename] = useState(null);

    return (
        <AudionContext.Provider value={
            {
                currentAudio, setCurrentAudio, 
                metadataCurrent, setMetadataCurrent, 
                playNow, setPlayNow,
                currentPhoto, setCurrentPhoto,
                filename, setFilename
            }
        }>
            {children}
        </AudionContext.Provider>
    )
}

export const useAudio = () => useContext(AudionContext);