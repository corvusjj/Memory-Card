import { useState, useRef } from 'react';
import PokemonBoard from './PokemonBoard';
import ScoreBoard, { ScoreBoardRef } from './ScoreBoard';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
}

export default function Game({pokemonDataSet}:RawDataProps) {
    const [pokemons, setPokemons] = useState(pokemonDataSet);
    const hitPokemonIds:number[] = [];

    const scoreBoardRef = useRef<ScoreBoardRef>(null);

    function shufflePokemons() {
        setPokemons(pokemons => {
            return [...pokemons.sort(() => Math.random() - 0.5)];
        });
    }

    function runHit(id:number) {
        console.log(hitPokemonIds);
        if (hitPokemonIds.includes(id)) {
            console.log('game-over');
        } else {
            hitPokemonIds.push(id);

            setTimeout(shufflePokemons, 2000);
        }
        if (scoreBoardRef.current) {
            scoreBoardRef.current.addScore();
        }
    }

    return (
        <div className="game">
            <button onClick={shufflePokemons}>Shuffle</button>
            <ScoreBoard ref={scoreBoardRef} />
            <PokemonBoard pokemonRawData={pokemons} runHit={runHit}/>
        </div>
    );
}
