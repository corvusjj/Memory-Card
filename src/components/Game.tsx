import PokemonBoard from './PokemonBoard';
import { RawData } from '../types/pokemon';

interface RawDataProps {
    pokemonDataSet: RawData[];
}

export default function Game({pokemonDataSet}:RawDataProps) {
    return (
        <div className="game">
            <PokemonBoard pokemonRawData={pokemonDataSet}/>
        </div>
    );
}
