const playlist = require('./playlist')
console.log(playlist)

let player = document.getElementById('player');
player.addEventListener('ended', CONTROLS.playNextTrack);
player.addEventListener('play', CONTROLS.startAnimations);
player.addEventListener('durationchange', CONTROLS.updateTotalTime);
player.addEventListener('timeupdate', CONTROLS.updateCurrentTime);
const CONTROLS = {

}