import React, {createContext, useContext, useRef, useState} from 'react';
import useAudioData from '../hooks/useAudioData.jsx';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [searchString, setSearchString] = useState('');

    return (
        <SearchContext.Provider value={
            {
                searchString, setSearchString
            }
        }>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext);