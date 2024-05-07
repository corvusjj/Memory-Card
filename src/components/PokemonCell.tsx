export default function PokemonCell(imgSrc:string, data) {
    return (
        <div className='pokemon-cell'>
            <img src={imgSrc} alt="pokemon" />
        </div>
    );
}
