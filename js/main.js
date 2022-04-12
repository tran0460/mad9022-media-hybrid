const CONTROL = {
    player: document.getElementById('player'),
    currentTrack: 0,
    init: async () => {
        //create the playlist
        VISUAL.createPlaylist()
        // hiding pause button as default
        document.getElementById('btnPause').classList.add('hidden')
        //make the first song of the list the default
        let songName = playlist[CONTROL.currentTrack].title
        await VISUAL.changeSong(songName)
        CONTROL.addListeners();
    },
    addListeners: () => {
        // add listeners to the playlist
        document.querySelector('.playlist').addEventListener('click', VISUAL.chooseSong)
        // add listeners to control buttons
        document.querySelector('.player-buttons').addEventListener('click', CONTROL.handleClick)
        // automatic features
        CONTROL.player.addEventListener('ended', CONTROL.playNextTrack);
        CONTROL.player.addEventListener('play', CONTROL.startAnimations);
        CONTROL.player.addEventListener('durationchange', CONTROL.updateTotalTime);
        CONTROL.player.addEventListener('timeupdate', CONTROL.updateCurrentTime);
    },
    handleClick: (ev) => {
        switch (ev.target.id) {
            case 'skip_previous':
                CONTROL.skipPrevious();
                break;
            case 'replay_10':
                CONTROL.replay10();
                break;
            case 'play_arrow':
                CONTROL.play();
                break;
            case 'pause':
                CONTROL.pause();
                break;
            case 'stop':
                CONTROL.stop();
                break;
            case 'forward_10':
                CONTROL.forward10();
                break;
            case 'skip_next':
                CONTROL.skipNext();
                break;
            case 'mute':
                CONTROL.mute();
                break;
            case 'unmute':
                CONTROL.unmute();
                break;
        }
    },
    findTrackIndex: (name) => { 
        playlist.forEach((track,i) => {
            if (track.title == name) {
                CONTROL.currentTrack = i
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
    startAnimations: () => {
        document.querySelector('.animation').classList.add('play')
    },
    stopAnimations: () => {
        document.querySelector('.animation').classList.remove('play')
    },
    updateTotalTime: () => {
        document.querySelector('progress').max = CONTROL.player.duration
        document.getElementById('total-time').innerHTML = CONTROL.convertTime(CONTROL.player.duration)
    },
    updateCurrentTime: () => {
        let currentTime = CONTROL.player.currentTime
        document.querySelector('progress').value = currentTime
        document.getElementById('current-time').innerHTML = CONTROL.convertTime(currentTime)
    },
    skipPrevious: () => {
        if (CONTROL.currentTrack === 0) {
        VISUAL.changeSong(playlist[playlist.length - 1].title)
        } else {
            VISUAL.changeSong(playlist[CONTROL.currentTrack - 1].title)
        }
        CONTROL.play()
    },
    replay10: () => {
        CONTROL.player.currentTime -= 10
    },
    play: () => {
        player.play()
        document.getElementById('btnPlay').classList.add('hidden')
        document.getElementById('btnPause').classList.remove('hidden')
        CONTROL.startAnimations()
    },
    pause: () => {
        CONTROL.player.pause()
        document.getElementById('btnPause').classList.add('hidden')
        document.getElementById('btnPlay').classList.remove('hidden')
        CONTROL.stopAnimations()
    },
    stop: () => {
        CONTROL.player.pause()
        CONTROL.player.currentTime = 0
    },
    forward10: () => {
        CONTROL.player.currentTime += 10
    },
    skipNext: () => {
        if (CONTROL.currentTrack === playlist.length - 1) {
        VISUAL.changeSong(playlist[0].title)
        } else  {
            VISUAL.changeSong(playlist[CONTROL.currentTrack + 1].title)
        }
        CONTROL.play()
    },
    mute: () => {
        CONTROL.player.muted = !CONTROL.player.muted
        document.getElementById('btnMute').classList.add('hidden')
        document.getElementById('btnUnmute').classList.remove('hidden')
    },
    unmute: () => {
        CONTROL.player.muted = !CONTROL.player.muted
        document.getElementById('btnMute').classList.remove('hidden')
        document.getElementById('btnUnmute').classList.add('hidden')
    }
}

const VISUAL = {
    chooseSong: async (ev) => {
        //get the name of the song your are clicking on, pass it to the changeSong function
        let trackName = ev.target.querySelector('.track-name').textContent
        ev.currentTarget.classList.add('active')
        await VISUAL.changeSong(trackName)
        CONTROL.play();
    },
    changeSong: (name) => {
        //update currentTrack
        CONTROL.findTrackIndex(name)
                let tracks = document.querySelectorAll('li')
                tracks.forEach(track => track.classList.remove('active'))
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
                        document.getElementById('big-thumbnail').alt = track.title
                        document.querySelector('h2').textContent = track.title
                        document.querySelector('p').textContent = track.artist
                        CONTROL.player.src = track.src
                    }
                })
    },
    createPlaylist: () => {
        let df = new DocumentFragment
        playlist.forEach(track => {
            let li = document.createElement('li');
            li.innerHTML = 
            `
            <div class="track">
            <img src= ${track.img} alt= ${track.img}>
                <div class="track-info">
                <p class="track-name">${track.title}</p>
                <p class="artist-name">${track.artist}</p>
                </div>
            </div>
            `
            df.append(li)
        })
        document.querySelector('.playlist').append(df)
    }
}

document.addEventListener('DOMContentLoaded',CONTROL.init())