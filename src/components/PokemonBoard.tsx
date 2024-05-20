import { useRef } from "react";
import PokemonCell from "./PokemonCell";
import { RawData } from "../types/pokemon";

interface RawDataProps {
    pokemonRawData: RawData[];
    runHit: (name:string, id:number, cellCoordinates:number[]) => void;
}

export default function PokemonBoard({pokemonRawData, runHit}:RawDataProps) {
    const gameBoardRef = useRef<HTMLDivElement>(null);

    function handleHit(name:string, id:number, cellCoordinates:number[]) {
        gameBoardRef.current?.setAttribute('data-inactive', '');        
        runHit(name, id, cellCoordinates);

        setTimeout(() => {
            gameBoardRef.current?.removeAttribute('data-inactive');
        }, 6800);
    }

    return (
        <div ref={gameBoardRef} className='pokemon-board'>
            {pokemonRawData.map(data => (
                <PokemonCell pokemonData={data} key={data.key} runHit={(name, id, cellCoordinates) => handleHit(name, id, cellCoordinates)}/>
            ))}
        </div>
    );
}
