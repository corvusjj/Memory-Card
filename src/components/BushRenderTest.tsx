import { useRef } from "react";

export default function BushRenderTest() {
    const bushSpritesRef = useRef<HTMLDivElement>(null);

    function delay(ms:number) {
        return new Promise(res => setTimeout(res, ms));
    }

    async function animateBush() {
        if (bushSpritesRef.current) {
            const bushSprites: HTMLImageElement[] = Array.from(bushSpritesRef.current.childNodes) as HTMLImageElement[];

            let lastBushSprite;
            let activeBushSprite = bushSprites[2];
            const indexPattern = [1, 0, 1, 2];

            for(let i=0; i<indexPattern.length; i++) {
                lastBushSprite = activeBushSprite;
                activeBushSprite = bushSprites[indexPattern[i]];
                lastBushSprite.classList.remove('show');
                activeBushSprite.classList.add('show');

                await delay(150);
            }
        }
    }

    return (
        <div ref={bushSpritesRef} onClick={animateBush} className="bush-render-test">
            <img src="../../images/bush-1.webp" alt="" />
            <img src="../../images/bush-2.webp" alt="" />
            <img className="show" src="../../images/bush-3.webp" alt="" />
        </div>
    );
}
