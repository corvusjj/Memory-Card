import { useRef, useImperativeHandle, forwardRef } from "react";

export interface ThrowerContainerRef {
    animateThrow: () => void;
}

const Thrower = forwardRef((_props, ref) => {
    const throwerContainer = useRef<HTMLDivElement>(null);
    const throwerSprite = useRef<HTMLImageElement>(null);
    const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

    async function hideThrower() {
        if (throwerContainer.current) {
            throwerContainer.current.classList.add('hide');
            await delay(3500);
            throwerContainer.current.classList.remove('hide');
        }
    }   

    useImperativeHandle(ref, () => {
        return {
            async animateThrow() {
                hideThrower();
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
        }
    });

    return (
        <div ref={throwerContainer} className="thrower-container">
                <img ref={throwerSprite} src="../../images/thrower.png" alt="" />
        </div>
    );
});

export default Thrower;
