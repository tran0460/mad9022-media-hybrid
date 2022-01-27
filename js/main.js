const CONTROL = {
    player: document.getElementById('player'),
    currentTrack: 0,
    init: () => {
        //add listeners to each li 
        let tracks = document.querySelectorAll('li')
        tracks.forEach(track => track.addEventListener('click',VISUAL.chooseSong))
        // hiding pause button as default
        document.getElementById('btnPause').classList.add('hidden')
        //control buttons
        document.getElementById('btnSkipPrevious').addEventListener('click',CONTROL.skipPrevious)
        document.getElementById('btnReplay10').addEventListener('click',CONTROL.replay10)
        document.getElementById('btnPlay').addEventListener('click',CONTROL.play)
        document.getElementById('btnPause').addEventListener('click',CONTROL.pause)
        document.getElementById('btnStop').addEventListener('click',CONTROL.stop)
        document.getElementById('btnForward10').addEventListener('click',CONTROL.forward10)
        document.getElementById('btnSkipNext').addEventListener('click',CONTROL.skipNext)
        //background features
        CONTROL.player.addEventListener('ended', CONTROL.playNextTrack);
        CONTROL.player.addEventListener('play', CONTROL.startAnimations);
        CONTROL.player.addEventListener('durationchange', CONTROL.updateTotalTime);
        CONTROL.player.addEventListener('timeupdate', CONTROL.updateCurrentTime);
        //make the first song of the list the default
        let songName = playlist[CONTROL.currentTrack].title
        VISUAL.changeSong(songName)
    },
    findTrackIndex: (name) => { 
        let i = -1
        playlist.forEach(track => {
            i++
            if (track.title == name) {
                CONTROL.currentTrack = i
                console.log(CONTROL.currentTrack)
            }
        })
    },
    convertTime: (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (seconds < 10) {
            seconds = `0${seconds}`
        } if (seconds == 60) {
            seconds = `00`
            minutes += 1
        }
        return  `${minutes}:${seconds}`
    },
    playNextTrack: () => {
        if (CONTROL.player.currentTime == CONTROL.player.duration) 
        CONTROL.skipNext()
        CONTROL.play()
    },
    startAnimations: () => {},
    updateTotalTime: () => {
        document.getElementById('total-time').innerHTML = CONTROL.convertTime(CONTROL.player.duration)
    },
    updateCurrentTime: () => {
        let currentTime = CONTROL.player.currentTime
        document.getElementById('current-time').innerHTML = CONTROL.convertTime(currentTime)
    },
    skipPrevious: () => {
        VISUAL.changeSong(playlist[CONTROL.currentTrack - 1].title)
    },
    replay10: () => {
        CONTROL.player.currentTime -= 10
    },
    play: () => {
        player.play()
        document.getElementById('btnPlay').classList.add('hidden')
        document.getElementById('btnPause').classList.remove('hidden')
        document.getElementById('audio-animation').classList.add('play-animation')
    },
    pause: () => {
        CONTROL.player.pause()
        document.getElementById('btnPause').classList.add('hidden')
        document.getElementById('btnPlay').classList.remove('hidden')
    },
    stop: () => {
        CONTROL.player.pause()
        CONTROL.player.currentTime = 0
    },
    forward10: () => {
        CONTROL.player.currentTime += 10
    },
    skipNext: () => {
        VISUAL.changeSong(playlist[CONTROL.currentTrack + 1].title)
    },
}

const VISUAL = {
    chooseSong: (ev) => {
        //get the name of the song your are clicking on, pass it to the changeSong function
        let trackName = ev.currentTarget.querySelector('.track-name').textContent
        ev.currentTarget.classList.add('active')
        VISUAL.changeSong(trackName)
    },
    changeSong: (name) => {
        //update currentTrack
        CONTROL.findTrackIndex(name)
        //pause if media player is running
        CONTROL.pause()
        //remove active class if there is one
        let tracks = document.querySelectorAll('li')
        if (document.querySelector('.active')) {
            document.querySelector('.active').classList.remove('active')
        }
        tracks.forEach(track => {
            let trackName = track.querySelector('.track-name').textContent
            if (trackName === name) {
                track.classList.add('active')
                }
            }
        )
        playlist.forEach(track => {
            if (track.title == name) {
                document.getElementById('big-thumbnail').src = track.img
                document.querySelector('h2').textContent = track.title
                document.querySelector('p').textContent = track.artist
                CONTROL.player.src = track.src
            }
        })
    }
}

CONTROL.init()