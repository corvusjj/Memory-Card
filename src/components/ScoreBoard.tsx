import { useState, useImperativeHandle, forwardRef, useRef } from "react";

export interface ScoreBoardRef {
    addScore: () => void;
}

const ScoreBoard = forwardRef((_props, ref) => {
    const [score, setScore] = useState(0);
    const scoreBoardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
        return {
            addScore() {
                setScore(score + 1);
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
