import { useState, useRef, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import PokemonBoard from './PokemonBoard';
import ScoreBoard, { ScoreBoardRef } from './ScoreBoard';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
    isLoading: boolean;
}

interface GameDataProps {
    pokemons: RawData[];
    hitIds: number[];
    score: number;
}

export default function Game({pokemonDataSet, isLoading}:RawDataProps) {
    const [gameData, setGameData] = useState<GameDataProps>({
        pokemons: pokemonDataSet,
        hitIds: [],
        score: 0
    });

    useEffect(() => {
        if (pokemonDataSet && pokemonDataSet.length > 0) {
          setGameData({
            pokemons: pokemonDataSet,
            hitIds: [],
            score: 0
          });
        }
      }, [pokemonDataSet]);

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
        const shuffledPokemonSet = shufflePokemons();
        let newHitIds:number[];
        let newScore:number;

        if (gameData.hitIds.includes(id)) {
            newHitIds = [];
            newScore = 0;
        } else {
            newHitIds = [...gameData.hitIds, id];
            newScore = gameData.score + 1;

            if (newScore === 16) return console.log('you hit them all!');
        }

        updateScoreBoard(newScore);

        setTimeout(() => {
            setGameData({score: newScore, pokemons: shuffledPokemonSet, hitIds: newHitIds});
        }, 2000);
    }

    return (
        <div className="game">
            {isLoading? (
                <LoadingPage/>
            ) : (
                <>
                    <ScoreBoard ref={scoreBoardRef} />
                    <PokemonBoard pokemonRawData={gameData.pokemons} runHit={runHit}/>
                </>
            )}            
        </div>
    );
}

// render prob
