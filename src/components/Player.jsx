import React, {useState, useEffect, useRef} from 'react';
import { useAudio } from '../contexts/AudioContext.jsx';
import PlayButton from './PlayButton.jsx';
import Previuos from "../icons/prev.svg";
import Next from "../icons/next.svg";
import { toMinute } from '../functions/smallFunctions.js';

function Player()
{
    const {
        currentAudio, setCurrentAudio, 
        metadataCurrent, setMetadataCurrent, 
        playNow, setPlayNow,
        currentPhoto, setCurrentPhoto,
        filename, setFilename
    } = useAudio();

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const updateCurrentTime = () => {
            setCurrentTime(currentAudio.currentTime);
        }

        if (currentAudio)
        {
            const interval = setInterval(updateCurrentTime, 250);

            return () => clearInterval(interval);
        }
    }, [currentAudio])

    const handleSliderChange = (e) => {
        if (currentAudio)
        {
            currentAudio.currentTime = e.target.value;
            setCurrentTime(e.target.value)
        }
    }

    return (<div className='player' style={{display: `${metadataCurrent ? "flex" : "none"}`}}>
        {metadataCurrent && <div className='playerInner'>
            <div className='sideOfPlayer'>
                <div className='playerPhoto'>
                    {currentPhoto != null ? <img src={currentPhoto} className='cover'/> : <p>No photo</p>}
                </div>
                <div className='playerMainInfo'>
                    <div className='playerInfo'>
                        <div className='playerInfoInner'>
                            <p 
                                className='playerTitle'
                            >{metadataCurrent.common.hasOwnProperty('title') ? metadataCurrent.common.title : filename.split('.').slice(0, -1).join('.')}</p>
                        </div>
                    </div>
                    <div className='playerInfo'>
                        <div className='playerInfoInner' >
                            <p 
                                className='playerAuthor' 
                            >{metadataCurrent.common.hasOwnProperty('album') ? metadataCurrent.common.album : '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainControlsOfPlayer'>
                <Previuos/>
                <PlayButton audio={currentAudio} isPlaying={playNow} setPlaying={setPlayNow}/>
                <Next/>
            </div>
            <div className='sideOfPlayerSecond'>
                <div className='wrapperForRange'>
                    <input 
                        className='slider'
                        type='range' 
                        min="0"
                        max={currentAudio ? currentAudio.duration : 100}
                        value={currentTime}
                        onChange={handleSliderChange}
                    />
                </div>
                <div className='currentTime'>
                    <p>{toMinute(currentTime)}</p>
                </div>
            </div>
        </div>}
    </div>)
}

export default Player;