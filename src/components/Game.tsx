import { useState, useRef } from 'react';
import PokemonBoard from './PokemonBoard';
import ScoreBoard, { ScoreBoardRef } from './ScoreBoard';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
}

interface GameDataProps {
    pokemons: RawData[];
    hitIds: number[];
}

export default function Game({pokemonDataSet}:RawDataProps) {
    // const [pokemons, setPokemons] = useState(pokemonDataSet);

    const [gameData, setGameData] = useState<GameDataProps>({
        pokemons: pokemonDataSet,
        hitIds: []
    });

    const scoreBoardRef = useRef<ScoreBoardRef>(null);

    function shufflePokemons() {
        return [...gameData.pokemons.sort(() => Math.random() - 0.5)];
    }

    function updateScoreBoard() {
        if (scoreBoardRef.current) {
            scoreBoardRef.current.addScore();
        }
    }   

    function runHit(id:number) {
        if (gameData.hitIds.includes(id)) {
            console.log('game-over');
        } else {
            updateScoreBoard();

            const newHitIds = [...gameData.hitIds, id];
            const shuffledPokemonSet = shufflePokemons();
            setGameData({pokemons: shuffledPokemonSet, hitIds: newHitIds});
        }
    }

    return (
        <div className="game">
            {/* <button onClick={shufflePokemons}>Shuffle</button> */}
            <ScoreBoard ref={scoreBoardRef} />
            <PokemonBoard pokemonRawData={gameData.pokemons} runHit={runHit}/>
        </div>
    );
}

//  updateScore() scoreBoard
