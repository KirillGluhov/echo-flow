import React, {createContext, useContext, useRef, useState} from 'react';

const AlbumContext = createContext();

export const AlbumProvider = ({children}) => {
    const [isAlbum, setAlbum] = useState(false);

    return (
        <AlbumContext.Provider value={
            {
                isAlbum, setAlbum
            }
        }>
            {children}
        </AlbumContext.Provider>
    )
}

export const useAlbum = () => useContext(AlbumContext);