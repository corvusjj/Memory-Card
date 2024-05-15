import PokemonCell from "./PokemonCell";
import { RawData } from "../types/pokemon";

interface RawDataProps {
    pokemonRawData: RawData[];
}

export default function PokemonBoard({pokemonRawData}:RawDataProps) {
    return (
        <div className='pokemon-board'>
            {pokemonRawData.map(data => (
                <PokemonCell pokemonData={data} key={data.key}/>
            ))}
        </div>
    );
}
