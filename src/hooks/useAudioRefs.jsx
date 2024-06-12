import { useState } from "react";

function useAudioRefs(initialValues)
{
    const [audioRefs, setAudioRefs] = useState(initialValues)

    function addAudioRef(newAudioRef)
    {
        setAudioRefs((prevAudioRefs) => [...prevAudioRefs, newAudioRef]);
    }

    function clearAudioRef()
    {
        setAudioRefs(initialValues);
    }

    return [audioRefs, addAudioRef, clearAudioRef];
}

export default useAudioRefs;