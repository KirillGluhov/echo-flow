export function toMinute(duration)
{
    let intDuration = Math.floor(+duration);

    let numberOfMinutes = Math.floor(intDuration / 60);
    let numberOfSeconds = intDuration % 60;

    return (numberOfSeconds < 10) ? 
    String(numberOfMinutes + ":0" + numberOfSeconds) :
    String(numberOfMinutes + ":" + numberOfSeconds);
}

export function getUniqueLetters(files)
{
    const uniqueLetters = new Set();
    Array.from(files).forEach(file => {
        const name = file.name.split(".").slice(0, -1).join('.');

        if (name.length > 0)
        {
            uniqueLetters.add(name.charAt(0).toUpperCase())
        }
    })
    return Array.from(uniqueLetters).sort();
}

export function thisSong(metaData, fileName, searchString)
{
    const title = metaData.hasOwnProperty('title') ? metaData.title : fileName.split('.').slice(0, -1).join('.');
    return title.toLowerCase().includes(searchString.toLowerCase());
}