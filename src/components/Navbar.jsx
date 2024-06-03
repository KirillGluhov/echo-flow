import React from 'react';
import { ReactComponent as searchIcon} from '../icons/search.svg';

function Navbar()
{
    return (
        <div className='navbar'>
            <div className='songs'>
                <p>Songs</p>
            </div>
            <div className='chooseFolders'>
                <p>Choose folders</p>
            </div>
            <div className='search'>
                {/*<searchIcon/>*/}
                <input className='findSong'></input>
            </div>
            <div className='albums'>
                <p>Albums</p>
            </div>
        </div>
    )
}

export default Navbar;