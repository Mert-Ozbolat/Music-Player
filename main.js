/* elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')


let index
let loop = true

const songsList = [
    {
        name: "Numb",
        link: "assets/Numb.mp3",
        artist: "Linkin Park",
        image: "assets/Linkin-Park.jpg"
    },
    {
        name: "I'm Good (Blue)",
        link: "assets/ImGood(Blue).mp3",
        artist: "David Guetta",
        image: "assets/david-guetta.jpg"
    },
    {
        name: "So Far Away",
        link: "assets/SoFarAway.mp3",
        artist: "Avenged Sevenfold",
        image: "assets/avenged-sevenfold2.jpg"
    },
    {
        name: "Nightmare",
        link: "assets/Nightmare.mp3",
        artist: "Avenged Sevenfold",
        image: "assets/avenged-sevenfold.jpeg"
    },
    {
        name: "One of the girls",
        link: "assets/OneOfTheGirls.mp3",
        artist: "The Weeknd",
        image: "assets/the-weeknd.jpeg"
    }
]

const setSong = (arrayIndex) => {
    let { name, link, artist, image } = songsList[arrayIndex];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;

    // Şarkı metadata yüklendiğinde süreyi ayarla
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };

    playListContainer.classList.add('hide');
};


const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60) // 3,25
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60) // 25
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}



const playAudio = () => {
    try {
        audio.play();
        pauseButton.classList.remove('hide');
        playButton.classList.add('hide');
    } catch (error) {
        console.error('Audio play error:', error);
    }
};


const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}


const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0;
        } else {
            index++;
        }
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length);
        index = randIndex;
    }
    setSong(index);
    playAudio(); // Şarkı değişiminden sonra çalmak için çağırıyoruz
};


const previousSong = () => {
    pauseAudio();
    if (index > 0) {
        index -= 1;
    } else {
        index = songsList.length - 1;
    }
    setSong(index);
    playAudio(); // Şarkı değişiminden sonra çalmak için çağırıyoruz
};

playButton.addEventListener('click', playAudio)
pauseButton.addEventListener('click', pauseAudio)
nextButton.addEventListener('click', nextSong)
prevButton.addEventListener('click', previousSong)

shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})

repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        loop = false
    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})


progressBar.addEventListener('click', (event) => {


    let coordStart = progressBar.getBoundingClientRect().left

    console.log("coordStart: " + coordStart)


    let coordEnd = event.clientX
    console.log("coordEnd: " + coordEnd)

    console.log("progressBar.offsetWidth: " + progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    console.log("progress: " + progress)
    currentProgress.style.width = progress * 100 + "%"


    audio.currentTime = progress * audio.duration // 300


    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click', () => {
    playListContainer.classList.add('hide')
})

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);


audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})


audio.onended = () => {
    nextSong()
}

const initializePlaylist = () => {
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

//ekran yuklenildiginda
window.onload = () => {
    index = 0;
    setSong(index);
    pauseAudio();
    initializePlaylist();
};
