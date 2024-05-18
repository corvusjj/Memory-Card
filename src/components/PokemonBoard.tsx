import { useRef } from "react";
import PokemonCell from "./PokemonCell";
import { RawData } from "../types/pokemon";

interface RawDataProps {
    pokemonRawData: RawData[];
    runHit: (id:number) => void;
}

export default function PokemonBoard({pokemonRawData, runHit}:RawDataProps) {
    const gameBoardRef = useRef<HTMLDivElement>(null);

    function handleHit(id:number) {
        gameBoardRef.current?.setAttribute('data-inactive', '');
        runHit(id);

        setTimeout(() => {
            gameBoardRef.current?.removeAttribute('data-inactive');
        }, 6000);
    }

    return (
        <div ref={gameBoardRef} className='pokemon-board'>
            {pokemonRawData.map(data => (
                <PokemonCell pokemonData={data} key={data.key} runHit={(id) => handleHit(id)}/>
            ))}
        </div>
    );
}
