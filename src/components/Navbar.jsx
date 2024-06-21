import React, { useState } from 'react';
import ChooseFolders from './ChooseFolders.jsx';
import Search from "../icons/search.svg";
import { useSearch } from '../contexts/SearchContext.jsx';
import { useAlbum } from '../contexts/AlbumContext.jsx';

function Navbar({ onFilesChange })
{
    const {searchString, setSearchString} = useSearch();
    const {isAlbum, setAlbum} = useAlbum();

    const handleInput = (event) => {
        const { value } = event.target;
        setSearchString(value);
        console.log(value);
    }

    const handleSongs = (album) => {
        setAlbum(album);
        console.log(album);
    }

    return (
        <div className='navbar'>
            <div className='songs'>
                <p 
                    onClick={() => handleSongs(false)} 
                    className='onHoverCursor'
                    style={{color: `${isAlbum ? "black" : "white"}`}}
                >Songs</p>
            </div>
            <ChooseFolders onFilesChange={onFilesChange}/>
            <div className='search'>
                <Search/>
                <input className='searchField' onChange={handleInput}/>
            </div>
            <div className='albums'>
                <p 
                    onClick={() => handleSongs(true)} 
                    className='onHoverCursor'
                    style={{color: `${isAlbum ? "white" : "black"}`}}
                >Albums</p>
            </div>
        </div>
    )
}

export default Navbar;