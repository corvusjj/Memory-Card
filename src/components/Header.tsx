import { useState, useImperativeHandle, forwardRef, useRef, SetStateAction } from "react";

export interface HeaderRef {
    updateScore: (score:number) => void;
}

const Header = forwardRef((_props, ref) => {
    const [score, setScore] = useState(0);
    const scoreBoardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
        return {
            updateScore(score: SetStateAction<number>) {
                setScore(score);
            }
        }
    });

    return (
        <header>
            <button>Menu</button>
            <div ref={scoreBoardRef} id="score-board">
                <span>Score: {score} / 16</span>
            </div>
            <button>Help</button>
        </header>
    );
});

export default Header;
