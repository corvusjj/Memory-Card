import { useState, useImperativeHandle, forwardRef } from "react";

interface FooterProps {
    changePokemon: () => void;
}

interface hitPokemonStatus {
    name: string;
    hitTwice: boolean;
}

export interface FooterRef {
    handleHitStatus: (name:string, hitTwice:boolean) => void;
}

const Footer = forwardRef(({changePokemon}:FooterProps, ref) => {
    const [hitPokemonStatus, setHitPokemonStatus] = useState<hitPokemonStatus>({name:'', hitTwice: false});

    useImperativeHandle(ref, () => {
        return {
            handleHitStatus(name:string, hitTwice:boolean) {
                setHitPokemonStatus({name, hitTwice});
            }
        }
    });

    if (hitPokemonStatus.name === '') return (
        <footer>
            <button id="change-pokemon-btn" onClick={changePokemon}>Change Pokemons</button>
        </footer>
    )

    return (
        <footer>
            {hitPokemonStatus.hitTwice? (
                <span>You already hit {hitPokemonStatus.name}! Score has been reset.</span>
            ) : (
                <span>You hit {hitPokemonStatus.name}!</span>
            )}
            <button id="change-pokemon-btn" onClick={changePokemon}>Change Pokemons</button>
        </footer>
    );
});

export default Footer;
