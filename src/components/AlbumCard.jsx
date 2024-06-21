import React, {useState, useEffect, useRef} from 'react';

function AlbumCard()
{
    return (<>
        {/*allmetadata && <div className='musicCard' key={index} onClick={handlePlayPause} style={{display: `${thisSong(allmetadata.common, file.name, searchString) ? "flex" : "none"}`}}>
             <div className='musicCardInnerPart'>
                <div className='photoPartOfMusicCard'>
                    {coverUrl != null ? <img src={coverUrl} className='cover'/> : <p>No photo</p>}
                </div>
                <div className='anotherPartOfMusicCard'>
                    <div className='musicCardFirstPartInside'>
                        <div className='onePartOfMusicCard'>
                            <p>{allmetadata.common.hasOwnProperty('title') ? allmetadata.common.title : file.name.split('.').slice(0, -1).join('.')}</p>
                        </div>
                        <div className='onePartOfMusicCard'>
                            <p>{allmetadata.common.hasOwnProperty('artist') ? allmetadata.common.artist : '-'}</p>
                        </div>
                        <div className='onePartOfMusicCard'>
                            <p>{allmetadata.common.hasOwnProperty('album') ? allmetadata.common.album : '-'}</p>
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} >
                    <source src={URL.createObjectURL(file)} type={file.type} />
                </audio>
            </div>
        </div>*/}
        </>);
}

export default AlbumCard;