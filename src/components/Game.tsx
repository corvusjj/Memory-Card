import { useState, useRef, useEffect } from 'react';
import Header, { HeaderRef } from './Header';
import SideBar, { SideBarRef } from './SideBar';
import LoadingPage from './LoadingPage';
import PokemonBoard from './PokemonBoard';
import Thrower, { ThrowerContainerRef } from './Thrower';
import Footer, {FooterRef} from './Footer';
import HelpModal, {HelpModalRef} from './HelpModal';
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
    const sidebarRef = useRef<SideBarRef>(null);
    const throwerContainerRef = useRef<ThrowerContainerRef>(null);
    const pokeballRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<FooterRef>(null);
    const helpModalRef = useRef<HelpModalRef>(null);
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

    function handleChangePokemon() {
        updateScoreBoard(0);
        changePokemon();
    }

    function shufflePokemons() {
        return [...gameData.pokemons.sort(() => Math.random() - 0.5)];
    }

    function updateScoreBoard(score:number) {
        if (headerRef.current) {
            headerRef.current.updateScore(score);
        }
    }

    function openSideBar() {
        if (sidebarRef.current) {
            sidebarRef.current.openSideBar();
        }
    }

    function openHelpModal() {
        if (helpModalRef.current) {
            helpModalRef.current.showModal();
        }
    }

    function updateFooterHitStatus(name:string, hitTwice:boolean) {
        if (footerRef.current) {
            footerRef.current.handleHitStatus(name, hitTwice);
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

    async function activateHit(name:string, id:number, cellCoordinates:number[]) {
        animateThrower();
        animatePokeBall(cellCoordinates);

        const shuffledPokemonSet = shufflePokemons();
        const hitTwice = gameData.hitIds.includes(id);
        let newHitIds:number[];
        let newScore:number;

        if (hitTwice) {
            newHitIds = [];
            newScore = 0;
        } else {
            newHitIds = [...gameData.hitIds, id];
            newScore = gameData.score + 1;
        }

        await delay(1000);
        
        updateScoreBoard(newScore);
        updateFooterHitStatus(name, hitTwice);
        if (newScore === 16) return console.log('you hit them all!');

        await delay(2000);
    
        //  rerender board with shuffled pokemons
        setGameData({score: newScore, pokemons: shuffledPokemonSet, hitIds: newHitIds});
    }

    return (
        <div ref={gameScreenRef} className="game">
            {isLoading? (
                <>
                    <Header ref={headerRef} openSideBar={openSideBar} openHelpModal={openHelpModal}/>
                    <SideBar ref={sidebarRef}/>
                    <LoadingPage/>
                    <HelpModal ref={helpModalRef}/>
                </>
            ) : (
                <>
                    <Header ref={headerRef} openSideBar={openSideBar} openHelpModal={openHelpModal}/>
                    <SideBar ref={sidebarRef}/>
                    <PokemonBoard pokemonRawData={gameData.pokemons} runHit={activateHit}/>
                    <Thrower ref={throwerContainerRef}/>
                    <Footer ref={footerRef} changePokemon={handleChangePokemon} />
                    <HelpModal ref={helpModalRef}/>

                    <div ref={pokeballRef} id='pokeball'>
                        <img src="../../images/pokeball.webp" alt="" />
                    </div>
                </>
            )}     
        </div>
    );
}

//  modal
//  menu
//  audio toggling
//  bush audio
