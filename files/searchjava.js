const typingText = document.getElementById("typing-text");
const text = typingText.textContent;
let index = 0;

typingText.textContent = "";

function type() {
    typingText.textContent += text[index];
    index++;
    if (index === text.length) {
        clearInterval(timer);
    }
}

const timer = setInterval(type, 100);
const form = document.querySelector('form');

document.getElementById("clear-filters-btn").addEventListener("click", function () {

    document.getElementById("max-duration").value = "";


    document.getElementById("explicit").value = "all";
});


const searchTermInput = document.querySelector('#search-term');
const resultsDiv = document.querySelector('#results');
const audioPlayer = document.querySelector('#audio-player');

let currentAudio = null;


const baseUrl = 'https://itunes.apple.com/search';
const params = {
    entity: 'song',
    limit: 200,
};



form.addEventListener('submit', async (event) => {
    event.preventDefault();


    const searchTerm = searchTermInput.value.trim();
    if (!searchTerm) {
        return;
    }
    params.term = searchTerm;

    const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
    const responseJson = await response.json();

    resultsDiv.innerHTML = '';

    const maxDurationInput = document.querySelector('#max-duration');
    const explicitInput = document.querySelector('#explicit');

    const maxDuration = Number(maxDurationInput.value);
    const explicitness = explicitInput.value;

    const filteredResults = responseJson.results.filter((result) => {
        return true;
    });


    let countf = 0;
    // if (filteredResults.length === 0) {
    //     resultsDiv.textContent = 'No results found.';
    // } 
    if (filteredResults.length === 0) {
        const message = document.createElement('div');
        message.textContent = 'No results found:(';
        message.style.color = 'grey';
        message.style.fontSize= '30px';
        message.style.fontWeight="bold";
        message.style.marginTop="20px";
        resultsDiv.appendChild(message);
      }
    else {

        responseJson.results.forEach((result) => {

            if (countf == 10) {
                return;
            }

            if (maxDuration && result.trackTimeMillis / 60000 > maxDuration) {
                return false;
            }

            if (explicitness === 'explicit' && !(result.trackExplicitness.toLowerCase() == 'explicit')) {
                return;
            }
            if (explicitness === 'not-explicit' && result.trackExplicitness.toLowerCase() == 'explicit') {
                return;
            }

            countf++;

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = result.artworkUrl100;
            img.alt = `${result.trackName} by ${result.artistName} album cover`;
            card.appendChild(img);

            const title = document.createElement('h2');
            title.textContent = result.trackName;
            card.appendChild(title);

            const artist = document.createElement('h3');
            artist.textContent = `Artist(s): ${result.artistName}`;
            card.appendChild(artist);

            const album = document.createElement('p');
            album.textContent = `Album: ${result.collectionName}`;
            card.appendChild(album);

            // const releaseDate = document.createElement('p');
            // releaseDate.textContent = `Release Date: ${result.releaseDate}`;
            // card.appendChild(releaseDate);

            const releaseDate = document.createElement('p');
            const releaseDateStr = result.releaseDate.split('T')[0]; // Get the date part only
            releaseDate.textContent = `Release Date: ${releaseDateStr}`;
            card.appendChild(releaseDate);

            const time = document.createElement('p');
            let mintime = Math.floor(result.trackTimeMillis / 60000);
            time.textContent = `Duration: ${mintime} min ${Math.floor((result.trackTimeMillis / 1000) % 60)} seconds`;
            card.appendChild(time);

            const exp = document.createElement('p');
            if (result.trackExplicitness == "explicit")
                exp.textContent = "explicit";
            else
                exp.textContent = "not explicit";
            card.appendChild(exp);

            const brk = document.createElement("br");
            card.appendChild(brk);


            if (result.previewUrl) {
                const audioPlayer = document.createElement('audio');
                audioPlayer.controls = true;
                const source = document.createElement('source');
                source.src = result.previewUrl;
                source.type = 'audio/mp3';
                audioPlayer.appendChild(source);
                card.appendChild(audioPlayer);

            }

            resultsDiv.appendChild(card);
        });
    }

});

playButton.addEventListener('click', () => {
    if (currentAudio !== null) {
        currentAudio.pause();
    }
    audioPlayer.src = audio.src;
    audioPlayer.play();
    currentAudio = audioPlayer;
});





