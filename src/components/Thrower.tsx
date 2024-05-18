import { useRef } from "react";

export default function Thrower() {
    const throwerSprite = useRef<HTMLImageElement>(null);
    const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

    async function animateThrower() {
        if (throwerSprite.current) {
            let leftDistance = 0;

            while (leftDistance <= 400) {
                throwerSprite.current.style.left = '-' + leftDistance + '%';
                leftDistance += 100;
                await delay(160);
            }

            throwerSprite.current.style.left = '0%';
        }
    }

    return (
        <>
            <button onClick={animateThrower}>Throw</button>
            <div className="thrower-container">
                <img ref={throwerSprite} src="../../images/thrower.png" alt="" />
            </div>
        </>
    );
}
