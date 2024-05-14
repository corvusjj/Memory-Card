import { useRef } from 'react';
import { RawData } from '../types/pokemon';

interface PokemonDataProps {
    pokemonData: RawData
}

export default function PokemonCell({pokemonData}: PokemonDataProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const cellRef = useRef<HTMLDivElement>(null);
    const bushSpritesRef = useRef<HTMLDivElement>(null);
    const pokemonSpriteRef = useRef<HTMLImageElement>(null);

    function playCryAudio() {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play();
        }
    }

    function shakeBush() {
        cellRef.current?.classList.add('shake-active');

        setTimeout(() => {
            cellRef.current?.classList.remove('shake-active');
        }, 700);
    }

    async function animateBush() {
        const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
        
        if (bushSpritesRef.current) {
            const bushSprites: HTMLImageElement[] = Array.from(bushSpritesRef.current.childNodes) as HTMLImageElement[];

            let lastBushSprite;
            let activeBushSprite = bushSprites[2];
            const indexPattern = [1, 0, 1, 2];

            for(let i=0; i<indexPattern.length; i++) {
                lastBushSprite = activeBushSprite;
                activeBushSprite = bushSprites[indexPattern[i]];
                lastBushSprite.classList.remove('show');
                activeBushSprite.classList.add('show');

                await delay(150);
            }
        }
    }

    function togglePokemon(show:boolean) {
        show? 
        pokemonSpriteRef.current?.setAttribute('data-show', 'true'):
        pokemonSpriteRef.current?.setAttribute('data-show', 'false');
    }

    function hitPokemon() {
        pokemonSpriteRef.current?.classList.add('hit');

        setTimeout(() => {
            pokemonSpriteRef.current?.classList.remove('hit');
        }, 3000);
    }

    function handleClick() {
        playCryAudio();
        shakeBush();
    }

    setTimeout(animateBush, Math.floor(Math.random() * 500));
    setTimeout(() => togglePokemon(true), 1000);
    setTimeout(() => togglePokemon(false), 4000);

    return (
        <div ref={cellRef} className='pokemon-cell' onClick={handleClick} onDoubleClick={hitPokemon}>
            <div ref={bushSpritesRef} className="bush-sprites">
                <img className='bush-sprite' src="../../images/bush-1.webp" alt="" />
                <img className='bush-sprite' src="../../images/bush-2.webp" alt="" />
                <img className='bush-sprite show' src="../../images/bush-3.webp" alt="" />
            </div>
            <img ref={pokemonSpriteRef} className='pokemon-sprite' src={pokemonData.sprite} data-show="false" alt="pokemon" />
            <audio ref={audioRef} src={pokemonData.cryAudio}></audio>
        </div> 
    );
}
