import React, { useEffect, useState, useRef } from 'react';
import { Buffer } from 'buffer';
import process from 'process';
const musicMetadata = require('music-metadata-browser');

window.Buffer = Buffer;
window.process = process;

function MusicCard({ file, key })
{
    const [allmetadata, setMetadata] = useState(null)
    const [coverUrl, setCoverUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        musicMetadata.parseBlob(file).then(metadata => {
            setMetadata(metadata)
            console.log(metadata)
            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const picture = metadata.common.picture[0];
                const blob = new Blob([picture.data], { type: picture.format });
                const url = URL.createObjectURL(blob);
                setCoverUrl(url);
            }
          });
    }, [file])

    return (<>
        {allmetadata && <div key={key} className='musicCard' onClick={handlePlayPause}>
            {coverUrl && <img src={coverUrl} alt="Cover" />}
            <p>{allmetadata.common.artist}</p>
            <p>{allmetadata.common.title}</p>
            <audio ref={audioRef} >
                <source src={URL.createObjectURL(file)} type={file.type} />
            </audio>
        </div>}
        </>)
}

export default MusicCard;