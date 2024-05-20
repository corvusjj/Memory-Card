const musicAudio:HTMLAudioElement = document.querySelector('#bg-music-audio')!;
const hitAudio:HTMLAudioElement = document.querySelector('#hit-audio')!;

musicAudio.volume = 0.5;
hitAudio.volume = 0.4;

let musicIsOn = true;
let sfxIsOn = true;

function changeMusicState(state:boolean) {
    musicIsOn = state;
    musicIsOn? musicAudio.play(): musicAudio.pause();
}

function changeSfxState(state:boolean) {
    sfxIsOn = state;
}

function playBackgroundMusic() {
    if (!musicIsOn) return;
    musicAudio.play();
}

function playCryAudio(id:number) {
    if (!sfxIsOn) return;
    const audio:HTMLAudioElement = document.querySelector(`#audio-${id}`)!;
    audio.volume = 0.5;
    audio.play();
}

function playHitAudio() {
    if (!sfxIsOn) return;
    hitAudio.play();
}

export {
    changeMusicState,
    changeSfxState,
    playBackgroundMusic,
    playCryAudio,
    playHitAudio
}
