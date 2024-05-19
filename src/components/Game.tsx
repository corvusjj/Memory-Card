import { useState, useRef, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import Header, { HeaderRef } from './Header';
import PokemonBoard from './PokemonBoard';
import Thrower, { ThrowerContainerRef } from './Thrower';
import Footer from './Footer';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
    isLoading: boolean;
    changePokemon: () => void;
}

interface GameDataProps {
    pokemons: RawData[];
    hitIds: number[];
    score: number;
}

export default function Game({pokemonDataSet, isLoading, changePokemon}:RawDataProps) {
    const [gameData, setGameData] = useState<GameDataProps>({
        pokemons: pokemonDataSet,
        hitIds: [],
        score: 0
    });

    const gameScreenRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HeaderRef>(null);
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
        if (headerRef.current) {
            headerRef.current.updateScore(score);
        }
    }
    
    function animateThrower() {
        if (throwerContainerRef.current) {
            throwerContainerRef.current.animateThrow();
        }
    }

    function animatePokeBall(cellCoordinates:number[]) {
        const [x, y] = cellCoordinates;
        let cellToGameScreenDistanceX:number;
        let cellToGameScreenDistanceY:number;

        if (gameScreenRef.current) {
            cellToGameScreenDistanceX = x - gameScreenRef.current.getBoundingClientRect().left + 20;
            cellToGameScreenDistanceY = y - gameScreenRef.current.getBoundingClientRect().top + 20;
        }

        setTimeout(() => {
            if (pokeballRef.current) {
                pokeballRef.current.classList.add('throw');
                pokeballRef.current.style.left = cellToGameScreenDistanceX  + 'px';
                pokeballRef.current.style.top = cellToGameScreenDistanceY  + 'px';
            }
        }, 400);
        setTimeout(() => {
            if (pokeballRef.current) {
                pokeballRef.current.classList.remove('throw');
                pokeballRef.current.style.left = '60px';
                pokeballRef.current.style.top = 'calc(100% - 180px)';
            }
        }, 1100);
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
        <div ref={gameScreenRef} className="game">
            {isLoading? (
                <LoadingPage/>
            ) : (
                <>
                    <Header ref={headerRef} />
                    <PokemonBoard pokemonRawData={gameData.pokemons} runHit={activateHit}/>
                    <Thrower ref={throwerContainerRef}/>
                    <Footer/>

                    <div ref={pokeballRef} id='pokeball'>
                        <img src="../../images/pokeball.webp" alt="" />
                    </div>
                    <button id="change-pokemon-btn" onClick={changePokemon}>Change Pokemons</button>
                </>
            )}            
        </div>
    );
}

//  audio toggling
//  sizes
//  bush audio
//  styling
