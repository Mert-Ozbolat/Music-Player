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


//sira 
let index

//döngu
let loop = true

//liste
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

//sarki atama  4
const setSong = (arrayIndex) => {
    console.log(arrayIndex)
    let { name, link, artist, image } = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    //sureyi ayarla
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    playListContainer.classList.add('hide')
    playAudio()
}


const timeFormatter = (timeInput) => {
    let minute = Math.floar(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floar(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}





// Şarkıyı Çal
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}
// Şarkıyı Durdur
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

// * NEXT SONG
const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        }
        else {
            index++
        }
    } else {
        let randIndex = Math.floor(Math.random() * songsList.length)
        index = randIndex
    }
    setSong(index)
    playAudio()
}


const previousSong = () => {
    pauseAudio()
    if (index > 0) {
        index--
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio
}



// * PLAY AND PAUSE BTN
playButton.addEventListener('click', playAudio)
pauseButton.addEventListener('click', pauseAudio)

// * Next Song
nextButton.addEventListener('click', nextSong)
prevButton.addEventListener('click', previousSong)

// * Karıştırma Butonu
shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
    } else {
        shuffleButton.classList.add('active')
        loop = false
    }
})


repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        loop = false
    } else {
        repeatButton.classList.add('active')
        loop = true
    }
})


// * progress bar
progressBar.addEventListener('click', (event) => {
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
})





window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
}







