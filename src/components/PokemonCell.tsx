import { useRef } from 'react';
import { RawData } from '../types/pokemon';

interface PokemonDataProps {
    pokemonData: RawData
}

export default function PokemonCell({pokemonData}: PokemonDataProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const cellRef = useRef<HTMLDivElement>(null);
    const bushSpritesRef = useRef<HTMLDivElement>(null);

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

    function handleClick() {
        playCryAudio();
        shakeBush();
    }

    return (
        <div ref={cellRef} className='pokemon-cell' onClick={handleClick}>
            <div ref={bushSpritesRef} className="bush-sprites">
                <img className='bush-sprite' src="../../images/bush-1.webp" alt="" />
                <img className='bush-sprite' src="../../images/bush-2.webp" alt="" />
                <img className='bush-sprite show' src="../../images/bush-3.webp" alt="" />
            </div>
            <img className='pokemon-sprite' src={pokemonData.sprite} alt="pokemon" />
            <audio ref={audioRef} src={pokemonData.cryAudio}></audio>
        </div>
    );
}
