import { useState } from 'react';
import PokemonBoard from './PokemonBoard';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
}

export default function Game({pokemonDataSet}:RawDataProps) {
    const [pokemons, setPokemons] = useState(pokemonDataSet);
    const hitPokemonIds:number[] = [];

    function shufflePokemons() {
        setPokemons(pokemons => {
            return [...pokemons.sort(() => Math.random() - 0.5)];
        });
    }

    function runHit(id:number) {
        if (hitPokemonIds.includes(id)) return console.log('game-over');
        hitPokemonIds.push(id);
    }

    return (
        <div className="game">
            {/* <span>Score {score} / 16</span> */}
            <button onClick={shufflePokemons}>Shuffle</button>
            <PokemonBoard pokemonRawData={pokemons} runHit={runHit}/>
        </div>
    );
}
