import React, { useImperativeHandle, forwardRef, useRef } from "react";

export interface HelpModalRef {
    showModal: () => void;
}

const HelpModal = forwardRef((_props, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        return {
            showModal() {
                if (dialogRef.current) dialogRef.current.showModal();
            }
        }
    });

    function handleModalClick(e: React.MouseEvent) {
        if (e.target === dialogRef.current) {
            if (dialogRef.current) dialogRef.current.close();
        }
    }

    return (
        <dialog ref={dialogRef} id='help-modal' onClick={handleModalClick}>
            <div className="container">
                <p>Hit all 16 Pokémon without hitting any of them twice.</p>
                <p>Click and hold to hear a pokemon's cry.</p>
            </div>    
        </dialog> 
    );
});

export default HelpModal;
