import React, {useState, useEffect, useRef} from 'react';
import { Buffer } from 'buffer';
import process from 'process';
import { useAudio } from '../contexts/AudioContext.jsx';
const musicMetadata = require('music-metadata-browser');
import { toMinute } from '../functions/smallFunctions.js';
import { useSearch } from '../contexts/SearchContext.jsx';
import { thisSong } from '../functions/smallFunctions.js';

window.Buffer = Buffer;
window.process = process;

function CardMusic({file, index})
{
    const [allmetadata, setMetadata] = useState(null)
    const [coverUrl, setCoverUrl] = useState(null);
    const audioRef = useRef(null);

    const {searchString, setSearchString} = useSearch();

    const {
        currentAudio, setCurrentAudio, 
        metadataCurrent, setMetadataCurrent, 
        playNow, setPlayNow,
        currentPhoto, setCurrentPhoto,
        filename, setFilename,
        currentIndex, setCurrentIndex,
        shuffle, setShuffle,

        audioData, addAudioData, clearAudioData
    } = useAudio();

    const handlePlayPause = () => {
        if (currentAudio && currentAudio !== audioRef.current)
        {
            currentAudio.pause();
            setPlayNow(false);
        }

        if (playNow && currentAudio === audioRef.current)
        {
            audioRef.current.pause();
            setPlayNow(false);
        }
        else
        {
            if (currentAudio && currentAudio !== audioRef.current)
            {
                currentAudio.pause();
                setPlayNow(false);
            }

            audioRef.current.play();

            setCurrentIndex(index);
            
            setFilename(file.name);
            setCurrentAudio(audioRef.current);
            setCurrentPhoto(coverUrl)
            setMetadataCurrent(allmetadata);
            setPlayNow(true);
            //
            console.log(audioData)
            //
        }
    };

    useEffect(() => {

        musicMetadata.parseBlob(file).then(metadata => {
            setMetadata(metadata);
            let cover = null;

            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const picture = metadata.common.picture[0];
                const blob = new Blob([picture.data], { type: picture.format });
                cover = URL.createObjectURL(blob);
                setCoverUrl(cover);
                
            }

            addAudioData(index,{
                metaData: metadata,
                photo: cover,
                fileName: file.name,
                audio: audioRef
            })
          });
    }, [file])

    useEffect(() => {
        if (currentAudio && currentAudio !== audioRef.current)
        {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [currentAudio])

    return (<>
        {allmetadata && <div className='musicCard' key={index} onClick={handlePlayPause} style={{display: `${thisSong(allmetadata.common, file.name, searchString) ? "flex" : "none"}`}}>
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
                    <div className='musicCardSecondPartInside'>
                        <div className='onePartOfMusicCard'>
                            <p>{toMinute(allmetadata.format.duration)}</p>
                        </div>
                        <div className='onePartOfMusicCard'>
                            <p>{allmetadata.common.hasOwnProperty('year') ? allmetadata.common.year : '-'}</p>
                        </div>
                        <div className='onePartOfMusicCard'>
                            <p>{allmetadata.format.codec == "MPEG 1 Layer 3" ? "MP3" : allmetadata.format.codec}</p>
                        </div>
                    </div>
                </div>
                <audio ref={audioRef} >
                    <source src={URL.createObjectURL(file)} type={file.type} />
                </audio>
            </div>
        </div>}
        </>);
}

export default CardMusic;