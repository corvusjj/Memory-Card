import { useState, useRef, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import Thrower, { ThrowerContainerRef } from './Thrower';
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

    const scoreBoardRef = useRef<ScoreBoardRef>(null);
    const throwerContainerRef = useRef<ThrowerContainerRef>(null);

    useEffect(() => {
        if (pokemonDataSet && pokemonDataSet.length > 0) {
          setGameData({
            pokemons: pokemonDataSet,
            hitIds: [],
            score: 0
          });
        }
      }, [pokemonDataSet]);

    function shufflePokemons() {
        return [...gameData.pokemons.sort(() => Math.random() - 0.5)];
    }

    function updateScoreBoard(score:number) {
        if (scoreBoardRef.current) {
            scoreBoardRef.current.updateScore(score);
        }
    }
    
    function animateThrower() {
        if (throwerContainerRef.current) {
            throwerContainerRef.current.animateThrow();
        }
    }

    function activateHit(id:number) {
        animateThrower();

        const shuffledPokemonSet = shufflePokemons();
        let newHitIds:number[];
        let newScore:number;

        if (gameData.hitIds.includes(id)) {
            newHitIds = [];
            newScore = 0;
        } else {
            newHitIds = [...gameData.hitIds, id];
            newScore = gameData.score + 1;
        }

        updateScoreBoard(newScore);
        if (newScore === 16) return console.log('you hit them all!');

        //  rerender board with shuffled pokemons
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
                    <PokemonBoard pokemonRawData={gameData.pokemons} runHit={activateHit}/>
                    <Thrower ref={throwerContainerRef}/>
                </>
            )}            
        </div>
    );
}

//  bush audio
