const CONTROL = {
    player: document.getElementById('player'),
    currentTrack: 0,
    totalTime: (number) => {
        let divide = number / 60
        let convertDecimal = divide.toFixed(2)
        return join = convertDecimal.split('.').join(':')
    },
    currentTime: (number) => {
            let divide = number / 100
            let convertDecimal = divide.toFixed(2)              
            return join = convertDecimal.split('.').join(':')

            //this function is not fully functional
    },
    init: () => {
        let tracks = document.querySelectorAll('li')
        tracks.forEach(track => track.addEventListener('click',VISUAL.changeSong))

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
        
        console.log('init')
    },
    playNextTrack: () => {},
    startAnimations: () => {},
    updateTotalTime: () => {
        document.getElementById('total-time').innerHTML = CONTROL.totalTime(CONTROL.player.duration)
    },
    updateCurrentTime: () => {
        let currentTime = CONTROL.currentTime(CONTROL.player.currentTime )
        document.getElementById('current-time').innerHTML = currentTime
    },
    skipPrevious: () => {},
    replay10: () => {},
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
    forward10: () => {},
    skipNext: () => {},
}

const VISUAL = {
    changeSong: (ev) => {
        let trackName = ev.currentTarget.querySelector('.track-name').textContent
        CONTROL.pause()
        if (document.querySelector('.active')) {
            document.querySelector('.active').classList.remove('active')
        }
        ev.currentTarget.classList.add('active')
        playlist.forEach(track => {
            if (track.title == trackName) {
                document.getElementById('big-thumbnail').src = track.img
                document.querySelector('h2').textContent = track.title
                document.querySelector('p').textContent = track.artist
                CONTROL.player.src = track.src
            }
        })
    }
}

CONTROL.init()