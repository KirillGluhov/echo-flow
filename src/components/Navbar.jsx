import React, { useState } from 'react';
import ChooseFolders from './ChooseFolders.jsx';
import Search from "../icons/search.svg";
import { useSearch } from '../contexts/SearchContext.jsx';

function Navbar({ onFilesChange })
{
    const {searchString, setSearchString} = useSearch();

    const handleInput = (event) => {
        const { value } = event.target;
        setSearchString(value);
        console.log(value);
    }

    return (
        <div className='navbar'>
            <div className='songs'>
                <p>Songs</p>
            </div>
            <ChooseFolders onFilesChange={onFilesChange}/>
            <div className='search'>
                <Search/>
                <input className='searchField' onChange={handleInput}/>
            </div>
            <div className='albums'>
                <p>Albums</p>
            </div>
        </div>
    )
}

export default Navbar;