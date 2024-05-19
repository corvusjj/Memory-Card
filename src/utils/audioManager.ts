const hitAudio:HTMLAudioElement = document.querySelector('#hit-audio')!;

hitAudio.volume = 0.4;

export function playCryAudio(id:number) {
    const audio:HTMLAudioElement = document.querySelector(`#audio-${id}`)!;
    audio.volume = 0.5;
    audio.play();
}

export function playHitAudio() {
    hitAudio.play();
}

