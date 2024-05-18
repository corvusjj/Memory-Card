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
    const pokeballRef = useRef<HTMLDivElement>(null);
    const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

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

    function animatePokeBall(cellCoordinates:number[]) {
        const [x, y] = cellCoordinates;

        setTimeout(() => {
            if (pokeballRef.current) {
                pokeballRef.current.classList.add('throw');
                pokeballRef.current.style.left = x + 'px';
                pokeballRef.current.style.top = y + 'px';
            }
        }, 400);
        setTimeout(() => {
            if (pokeballRef.current) {
                pokeballRef.current.classList.remove('throw');
                pokeballRef.current.style.left = '30px';
                pokeballRef.current.style.top = 'calc(100% - 120px)';
            }
        }, 1200);
    }

    async function activateHit(id:number, cellCoordinates:number[]) {
        animateThrower();
        animatePokeBall(cellCoordinates);

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

        await delay(3000);

        updateScoreBoard(newScore);
        if (newScore === 16) return console.log('you hit them all!');

        //  rerender board with shuffled pokemons
        setGameData({score: newScore, pokemons: shuffledPokemonSet, hitIds: newHitIds});
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
                    <div ref={pokeballRef} id='pokeball'>
                        <img src="../../images/pokeball.png" alt="" />
                    </div>
                </>
            )}            
        </div>
    );
}

//  bush audio
//  audio toggling
//  throw-ball animation
//  styling
