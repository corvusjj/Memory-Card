import { useState, useImperativeHandle, forwardRef } from "react";

interface hitPokemonStatus {
    name: string;
    hitTwice: boolean;
}

export interface FooterRef {
    handleHitStatus: (name:string, hitTwice:boolean) => void;
}

const Footer = forwardRef((_props, ref) => {
    const [hitPokemonStatus, setHitPokemonStatus] = useState<hitPokemonStatus>({name:'', hitTwice: false});

    useImperativeHandle(ref, () => {
        return {
            handleHitStatus(name:string, hitTwice:boolean) {
                setHitPokemonStatus({name, hitTwice});
            }
        }
    });

    if (hitPokemonStatus.name === '') return <footer></footer>

    return (
        <footer>
            {hitPokemonStatus.hitTwice? (
                <span>You already hit {hitPokemonStatus.name}! Score has been reset.</span>
            ) : (
                <span>You hit {hitPokemonStatus.name}!</span>
            )}
        </footer>
    );
});

export default Footer;
