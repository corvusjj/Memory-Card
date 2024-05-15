import { useState } from 'react';
import PokemonBoard from './PokemonBoard';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
}

export default function Game({pokemonDataSet}:RawDataProps) {
    const [pokemons, setPokemons] = useState(pokemonDataSet);
    const hitPokemonIds = [];

    const score = 0;

    function shufflePokemons() {
        setPokemons(pokemons => {
            return [...pokemons.sort(() => Math.random() - 0.5)];
        });
    }

    return (
        <div className="game">
            <span>Score {score} / 16</span>
            <button onClick={shufflePokemons}>Shuffle</button>
            <PokemonBoard pokemonRawData={pokemons}/>
        </div>
    );
}
