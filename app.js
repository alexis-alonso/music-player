const musicContainer = document.querySelector('.music-container');
const musicInfo = document.querySelector('.music-info');
const title = document.querySelector('#title');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const audio = document.querySelector('#audio');
const imgContainer = document.querySelector('.img-container');
const cover = document.querySelector('#cover');
const navigation = document.querySelector('.navigation');
const previous = document.querySelector('#previous');
const play = document.querySelector('#play');
const forward = document.querySelector('#forward');


// song titles
const songs = ['ricco-harbor', 'trigger-happy-havoc', 'courtroom'];

// keep track of songs
let songIndex = 1;

// initially load songs info DOM
loadSong(songs[songIndex])

// update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `${song}.mp3`;
    cover.src = `${song}.jpg`;

}

function playSong() {
    musicContainer.classList.add('play');
    play.innerText = 'Pause';
    // add icons class for the pause button, ready to be pressed if song already playing
    // play.querySelector().classList.remove(play icon);
    // play.querySelector().classList.add(pause icon);

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    play.innerText = 'Play';
    // add icons class for the play button, ready to be pressed if song is not playing
    // play.querySelector().classList.add(play icon);
    // play.querySelector().classList.remove(pause icon);

    audio.pause();
}

function prevSong() {
    songIndex--;
    
    // what if we are at beginning of list? go right around to the end!
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
  
}

function nextSong() {
    songIndex++;
    
    // what if we are at beginning of list? go right around to the end!
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
  
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// function volumeChange() {
//     volumeShow.innerHTML = recentVolume.value;
//     let audio = songs[songIndex];
//     audio.volume = recentVolume.value / 100;
// }

function muteSound() {
    if (audio.muted === false) {
        audio.muted = true;
    }
    
    else {
        audio.muted = false;
    }
}

// event listeners
play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    
    if(isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }

})

previous.addEventListener('click', prevSong);

forward.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong);