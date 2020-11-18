const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



//Disable/Enable Button
function toggleButton() {
    button.disable = !button.disable
}

//Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke)
    VoiceRSS.speech({
        key: '3f50401e49ef46458f5742c242f1013a',
        src: joke,
        hl: 'en-us',
        v: 'Luna',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist&type=single'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        //Text-to-speech
        tellMe(joke);
        //Disable Button
        toggleButton();
    } catch (error){
        console.log('whoops', error);
    }
}

//Event Listener
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)