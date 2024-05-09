import { RawData } from '../types/pokemon';
 
interface PokemonDataProps {
    pokemonData: RawData
}

export default function PokemonCell({pokemonData}: PokemonDataProps) {
    // console.log(pokemonData);

    return (
        <div className='pokemon-cell'>
            <img src={pokemonData.sprite} alt="pokemon" />
        </div>
    );
}
