import { useState } from "react";

export default function ScoreBoard() {
    const [score, setScore] = useState(0);

    function addScore() {
        setScore(score + 1);
    }

    return (
        <div id="score-board">
            <span>Score: {score} / 16</span>
        </div>
    );
}
