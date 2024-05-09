import { useRef } from 'react';
import { RawData } from '../types/pokemon';

interface PokemonDataProps {
    pokemonData: RawData
}

export default function PokemonCell({pokemonData}: PokemonDataProps) {
    const audioRef = useRef<HTMLAudioElement>(null)

    function playCryAudio() {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play();
        }
    }

    return (
        <div className='pokemon-cell'>
            <img src={pokemonData.sprite} alt="pokemon" />
            <button onClick={playCryAudio}>Cry</button>

            <audio ref={audioRef} src={pokemonData.cryAudio}></audio>
        </div>
    );
}
