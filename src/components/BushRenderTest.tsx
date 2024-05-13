import { useRef } from "react";

export default function BushRenderTest() {
    const spriteRef = useRef<HTMLImageElement>(null);

    function shakeBush() {
        spriteRef.current?.classList.add('shake');

        setTimeout(() => {
            spriteRef.current?.classList.remove('shake');
        }, 700);
    }

    return (
        <div className="bush-render-test">
            {/* <img src="../../images/bush-1.webp" alt="" /> */}
            {/* <img src="../../images/bush-2.webp" alt="" /> */}
            <img ref={spriteRef} onClick={shakeBush} src="../../images/bush-3.webp" alt="" />
        </div>
    );
}
