import { useState, useImperativeHandle, forwardRef, useRef, SetStateAction } from "react";

interface HeaderProps {
    openHelpModal: () => void;
}

export interface HeaderRef {
    updateScore: (score:number) => void;
}

const Header = forwardRef(({openHelpModal}:HeaderProps, ref) => {
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
            <button id="menu-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">             
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="#ebebeb" strokeWidth={1.32} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <div ref={scoreBoardRef} id="score-board">
                <span>Score: {score} / 16</span>
            </div>
            <button id="help-btn" onClick={openHelpModal}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17v-.0071m0-2.1358c0-3.2142 3-2.5 3-4.99996C15 8.27919 13.6568 7 12 7c-1.3433 0-2.48039.84083-2.86267 2" stroke="#ebebeb" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </header>
    );
});

export default Header;
