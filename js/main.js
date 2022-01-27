const CONTROL = {
    player: document.getElementById('player'),
    currentTrack: 0,
    init: () => {
        let tracks = document.querySelectorAll('li')
        tracks.forEach(track => track.addEventListener('click',VISUAL.chooseSong))

        document.getElementById('btnPause').classList.add('hidden')
        
        document.getElementById('btnSkipPrevious').addEventListener('click',CONTROL.skipPrevious)
        document.getElementById('btnReplay10').addEventListener('click',CONTROL.replay10)
        document.getElementById('btnPlay').addEventListener('click',CONTROL.play)
        document.getElementById('btnPause').addEventListener('click',CONTROL.pause)
        document.getElementById('btnStop').addEventListener('click',CONTROL.stop)
        document.getElementById('btnForward10').addEventListener('click',CONTROL.forward10)
        document.getElementById('btnSkipNext').addEventListener('click',CONTROL.skipNext)
        
        CONTROL.player.src = playlist[CONTROL.currentTrack].src
        
        CONTROL.player.addEventListener('ended', CONTROL.playNextTrack);
        CONTROL.player.addEventListener('play', CONTROL.startAnimations);
        CONTROL.player.addEventListener('durationchange', CONTROL.updateTotalTime);
        CONTROL.player.addEventListener('timeupdate', CONTROL.updateCurrentTime);
        
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
        let prevSongName = playlist[CONTROL.currentTrack - 1].title
        VISUAL.changeSong(prevSongName)
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
        if (CONTROL.currentTrack === playlist.length) {
            VISUAL.changeSong(playlist[CONTROL.currentTrack ].title)
        } else {
            VISUAL.changeSong(playlist[CONTROL.currentTrack + 1].title)
        }
    },
}

const VISUAL = {
    chooseSong: (ev) => {
        let trackName = ev.currentTarget.querySelector('.track-name').textContent
        ev.currentTarget.classList.add('active')
        VISUAL.changeSong(trackName)
    },
    changeSong: (name) => {
        CONTROL.findTrackIndex(name)
        CONTROL.pause()
        if (document.querySelector('.active')) {
            document.querySelector('.active').classList.remove('active')
        }
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