import React, {createContext, useContext, useRef, useState} from 'react';
import useAudioData from '../hooks/useAudioData.jsx';

const MusicionContext = createContext();

export const MusicProvider = ({children}) => {
    const [audioData, addAudioData, clearAudioData] = useAudioData([]);

    return (
        <MusicionContext.Provider value={
            {
                audioData, addAudioData, clearAudioData
            }
        }>
            {children}
        </MusicionContext.Provider>
    )
}

export const useMusic = () => useContext(MusicionContext);