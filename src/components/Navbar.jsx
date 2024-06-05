import React, { useState } from 'react';
import { ReactComponent as searchIcon} from '../icons/search.svg';
import ChooseFolders from './ChooseFolders.jsx';

function Navbar({ onFilesChange })
{
    return (
        <div className='navbar'>
            <div className='songs'>
                <p>Songs</p>
            </div>
            <ChooseFolders onFilesChange={onFilesChange}/>
            <div className='search'>
                
            </div>
            <div className='albums'>
                <p>Albums</p>
            </div>
        </div>
    )
}

export default Navbar;