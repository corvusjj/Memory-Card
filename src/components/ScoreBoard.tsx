import { useState, useImperativeHandle, forwardRef, useRef, SetStateAction } from "react";

export interface ScoreBoardRef {
    updateScore: (score:number) => void;
}

const ScoreBoard = forwardRef((_props, ref) => {
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
        <div ref={scoreBoardRef} id="score-board">
            <span>Score: {score} / 16</span>
        </div>
    );
});

export default ScoreBoard;
