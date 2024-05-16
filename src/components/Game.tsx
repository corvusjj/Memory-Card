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
    score: number;
}

export default function Game({pokemonDataSet}:RawDataProps) {
    // const [pokemons, setPokemons] = useState(pokemonDataSet);

    const [gameData, setGameData] = useState<GameDataProps>({
        pokemons: pokemonDataSet,
        hitIds: [],
        score: 0
    });

    const scoreBoardRef = useRef<ScoreBoardRef>(null);

    function shufflePokemons() {
        return [...gameData.pokemons.sort(() => Math.random() - 0.5)];
    }

    function updateScoreBoard(score:number) {
        if (scoreBoardRef.current) {
            scoreBoardRef.current.updateScore(score);
        }
    }   

    function runHit(id:number) {
        if (gameData.hitIds.includes(id)) {
            console.log('game-over');
        } else {
            const newHitIds = [...gameData.hitIds, id];
            const shuffledPokemonSet = shufflePokemons();
            const newScore = gameData.score + 1;

            updateScoreBoard(newScore);

           setTimeout(() => {
            setGameData({score: newScore, pokemons: shuffledPokemonSet, hitIds: newHitIds});
           }, 2000);
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
