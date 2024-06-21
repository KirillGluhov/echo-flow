import React, {useState, useEffect, useRef} from 'react';
import { useAudio } from '../contexts/AudioContext.jsx';
import PlayButton from './PlayButton.jsx';
import PreviuosButton from './PreviuosButton.jsx';
import NextButton from './NextButton.jsx';
import { toMinute } from '../functions/smallFunctions.js';
import ShuffleOrNotButton from './ShuffleOrNotButton.jsx';
import { useMusic } from '../contexts/MusicContext.jsx';

/*
{
    metadata: //,
    photo: //,
    fileName: //,
    audio: //,
}
*/

function Player()
{
    const {audioData, addAudioData, clearAudioData} = useMusic();

    const {
        currentAudio, setCurrentAudio, // текущее аудио -
        metadataCurrent, setMetadataCurrent, // метаданные текущего трека !
        playNow, setPlayNow, // играет ли текущий трек -
        currentPhoto, setCurrentPhoto, // текущее фото !
        filename, setFilename, // название текущего файла !
        currentIndex, setCurrentIndex, // изменение текущего индекса (среди всех) +
        shuffle, setShuffle, // режим воспроизведения (последовательно или случайно) +
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

    useEffect(() => {
        if (currentAudio) {
            if (shuffle) {
                currentAudio.addEventListener('ended', handleRandomTrack);
            } else {
                currentAudio.addEventListener('ended', handleNextTrack);
            }

            return () => {
                if (shuffle) {
                    currentAudio.removeEventListener('ended', handleRandomTrack);
                } else {
                    currentAudio.removeEventListener('ended', handleNextTrack);
                }
            };
        }
    }, [currentAudio]);

    const handleNextTrack = () => {

        let nextIndex = currentIndex + 1;

        if (nextIndex >= Object.keys(audioData).length) {
            nextIndex = 0;
        }

        //
        console.log(nextIndex, currentIndex, Object.keys(audioData).length);
        //

        if (audioData[nextIndex]) {
            const nextAudio = audioData[nextIndex].audio;

            setMetadataCurrent(audioData[nextIndex].metaData); 
            setCurrentPhoto(audioData[nextIndex].photo);
            setFilename(audioData[nextIndex].fileName);
            
            setCurrentAudio(audioData[nextIndex].audio.current);
            nextAudio.current.play();
            setPlayNow(true);

            setCurrentIndex(nextIndex);
            
        } 
        else 
        {
            
            setMetadataCurrent(audioData[0].metaData);
            setCurrentPhoto(audioData[0].photo);
            setFilename(audioData[0].fileName);
    
            setCurrentAudio(audioData[0].audio.current);
            audioData[0].audio.current.play();
            setPlayNow(true);

            setCurrentIndex(0);
        }
    }

    const handleRandomTrack = () => {
        let randomIndex = Math.floor(Math.random() * Object.keys(audioData).length);

        //
        console.log(randomIndex, currentIndex, Object.keys(audioData).length);
        //

        if (audioData[randomIndex]) {
            const randomAudio = audioData[randomIndex].audio;

            setMetadataCurrent(audioData[randomIndex].metaData); 
            setCurrentPhoto(audioData[randomIndex].photo);
            setFilename(audioData[randomIndex].fileName);
            
            setCurrentAudio(audioData[randomIndex].audio.current);
            randomAudio.current.play();
            setPlayNow(true);

            setCurrentIndex(randomIndex);
            
        } 
    }

    const handlePrevTrack = () => {

        let prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            prevIndex = Object.keys(audioData).length - 1;
        }

        //
        console.log(prevIndex, currentIndex, Object.keys(audioData).length);
        //

        if (audioData[prevIndex]) 
        {
            const prevAudio = audioData[prevIndex].audio;

            setMetadataCurrent(audioData[prevIndex].metaData); 
            setCurrentPhoto(audioData[prevIndex].photo);
            setFilename(audioData[prevIndex].fileName);
            
            setCurrentAudio(audioData[prevIndex].audio.current);
            prevAudio.current.play();
            setPlayNow(true);

            setCurrentIndex(prevIndex);
        }
        else
        {
            setMetadataCurrent(audioData[Object.keys(audioData).length - 1].metaData);
            setCurrentPhoto(audioData[Object.keys(audioData).length - 1].photo);
            setFilename(audioData[Object.keys(audioData).length - 1].fileName);
    
            setCurrentAudio(audioData[Object.keys(audioData).length - 1].audio.current);
            audioData[Object.keys(audioData).length - 1].audio.current.play();
            setPlayNow(true);

            setCurrentIndex(Object.keys(audioData).length - 1);
        }
    }

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
                <div className='wrapperForPlayerInfo'>
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
                <div className='playerShuffleOfNotShuffle'>
                    <ShuffleOrNotButton shuffle={shuffle} setShuffle={setShuffle}/>
                </div>
            </div>
            <div className='mainControlsOfPlayer'>
                <PreviuosButton onClick={shuffle ? handleRandomTrack : handlePrevTrack}/>
                <PlayButton audio={currentAudio} isPlaying={playNow} setPlaying={setPlayNow}/>
                <NextButton onClick={shuffle ? handleRandomTrack : handleNextTrack}/>
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