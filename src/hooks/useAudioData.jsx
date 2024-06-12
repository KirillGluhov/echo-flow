import { useState } from "react";

function useAudioData(initialValues)
{
    const [audioData, setAudioData] = useState(initialValues)

    function addAudioData(index, newAudioData) {
        setAudioData(prevAudioData => ({
            ...prevAudioData,
            [index]: newAudioData
        }));
    }

    function clearAudioData()
    {
        setAudioData(initialValues);
    }

    return [audioData, addAudioData, clearAudioData];
}

export default useAudioData;