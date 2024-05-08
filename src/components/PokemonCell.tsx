export default function PokemonCell({pokemonData}) {
    console.log(pokemonData);

    return (
        <div className='pokemon-cell'>
            <img src={pokemonData.sprite} alt="pokemon" />
        </div>
    );
}
