import { useRef } from 'react';
import { RawData } from '../types/pokemon';

interface PokemonDataProps {
    pokemonData: RawData
}

export default function PokemonCell({pokemonData}: PokemonDataProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const cellRef = useRef<HTMLDivElement>(null);

    function playCryAudio() {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play();
        }
    }

    function shakeBush() {
        cellRef.current?.classList.add('shake-active');

        setTimeout(() => {
            cellRef.current?.classList.remove('shake-active');
        }, 700);
    }

    function handleClick() {
        playCryAudio();
        shakeBush();
    }

    return (
        <div ref={cellRef} className='pokemon-cell' onClick={handleClick}>
            <img className='bush-sprite' src="../../images/bush-3.webp" alt="" />
            <img className='pokemon-sprite' src={pokemonData.sprite} alt="pokemon" />
            <audio ref={audioRef} src={pokemonData.cryAudio}></audio>
        </div>
    );
}
