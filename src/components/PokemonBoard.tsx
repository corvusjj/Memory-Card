import { useRef } from "react";
import PokemonCell from "./PokemonCell";
import { RawData } from "../types/pokemon";

interface RawDataProps {
    pokemonRawData: RawData[];
    runHit: (id:number, cellCoordinates:number[]) => void;
}

export default function PokemonBoard({pokemonRawData, runHit}:RawDataProps) {
    const gameBoardRef = useRef<HTMLDivElement>(null);

    function handleHit(id:number, cellCoordinates:number[]) {
        gameBoardRef.current?.setAttribute('data-inactive', '');
        runHit(id, cellCoordinates);

        setTimeout(() => {
            gameBoardRef.current?.removeAttribute('data-inactive');
        }, 6000);
    }

    return (
        <div ref={gameBoardRef} className='pokemon-board'>
            {pokemonRawData.map(data => (
                <PokemonCell pokemonData={data} key={data.key} runHit={(id, cellCoordinates) => handleHit(id, cellCoordinates)}/>
            ))}
        </div>
    );
}
