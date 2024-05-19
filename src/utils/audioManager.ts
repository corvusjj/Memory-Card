export function playCryAudio(id:number) {
    const audio:HTMLAudioElement = document.querySelector(`#audio-${id}`)!;
    audio.volume = 0.5;
    audio.play();
}   