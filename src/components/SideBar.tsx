import { useImperativeHandle, forwardRef, useRef, useState } from "react";

export interface SideBarRef {
    openSideBar: () => void;
}

function MusicBtn() {
    const [musicIsOn, setMusicIsOn] = useState(true);
    
    function toggleMusic() {
        setMusicIsOn(!musicIsOn);
    }

    return (
        <button onClick={toggleMusic}>
            {musicIsOn? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff" viewBox="0 0 24 24">
                    <path stroke="#ebebeb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.512" d="M12.5 8.89v9.61m0-9.61V5.577c0-.208 0-.311.035-.4a.5.5 0 01.144-.2c.073-.061.171-.094.368-.16l4.4-1.466c.356-.119.533-.178.675-.142a.5.5 0 01.3.216c.078.123.078.31.078.685v3.313c0 .208 0 .311-.035.4a.5.5 0 01-.144.2c-.073.06-.171.094-.368.16l-4.4 1.466c-.355.118-.533.178-.675.142a.5.5 0 01-.3-.216c-.078-.123-.078-.31-.078-.685zm0 9.61c0 1.38-1.567 2.5-3.5 2.5s-3.5-1.12-3.5-2.5S7.067 16 9 16s3.5 1.12 3.5 2.5z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="#ebebeb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.512" d="M12.5 6.894V5.577c0-.208 0-.311.035-.4a.5.5 0 01.144-.2c.073-.061.171-.094.368-.16l4.4-1.466c.356-.119.533-.178.675-.142a.5.5 0 01.3.216c.078.123.078.31.078.685v3.313c0 .208 0 .311-.035.4a.5.5 0 01-.144.2c-.073.061-.171.094-.368.16l-3.134 1.044M12.5 12.5v6m0 0c0 1.38-1.567 2.5-3.5 2.5s-3.5-1.12-3.5-2.5S7.067 16 9 16s3.5 1.12 3.5 2.5zM3 3l18 18"></path>
                </svg>
            )}
        </button>
    );
}

function SfxBtn() {
    const [sfxIsOn, setSfxIsOn] = useState(true);

    function toggleSfx() {
        setSfxIsOn(!sfxIsOn);
    }

    return (
        <button onClick={toggleSfx}>
            {sfxIsOn? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff" strokeWidth="0" viewBox="0 0 15 15">
                    <path fill="#ebebeb" d="M3.5 10.494l.257-.429-.119-.07H3.5v.5zm0-5.996v.5h.138l.12-.071-.258-.429zm5-2.998H9a.5.5 0 00-.757-.429L8.5 1.5zm0 11.992l-.257.429A.5.5 0 009 13.492h-.5zm5.353-9.348l-.353-.353-.707.707.354.354.706-.708zm-.706 5.997l-.354.353.707.707.353-.353-.706-.708zM3.5 9.993h-2v1h2v-1zm-2 0a.5.5 0 01-.5-.5H0c0 .83.672 1.5 1.5 1.5v-1zm-.5-.5V5.498H0v3.998h1zm0-3.997a.5.5 0 01.5-.499v-1a1.5 1.5 0 00-1.5 1.5h1zm.5-.499h2v-1h-2v1zm2.257-.071l5-2.998-.514-.858-5 2.998.514.858zM8 1.5v11.992h1V1.5H8zm.757 11.563l-5-2.998-.514.858 5 2.998.514-.858zM13.5 4.498c-.353.354-.354.354-.354.353 0 0 0 0 0 0s0 0 0 0a.01.01 0 01-.002-.002l.003.003.02.022a3.186 3.186 0 01.386.597c.22.439.447 1.112.447 2.025h1c0-1.086-.272-1.911-.553-2.472a4.198 4.198 0 00-.39-.639 2.932 2.932 0 00-.181-.217l-.014-.015-.005-.005-.002-.002s0 0 0 0l-.001-.001-.354.353zm.5 2.998c0 .913-.228 1.586-.447 2.025a3.184 3.184 0 01-.386.597.83.83 0 01-.023.025s0 0 0 0l.001-.001s0 0 0 0l.001-.001.354.353c.353.354.354.354.354.353 0 0 0 0 0 0h.001l.002-.003.005-.005.014-.014.043-.048c.035-.04.082-.097.137-.17.11-.146.251-.36.391-.639.28-.56.553-1.386.553-2.472h-1z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 15">
                    <path fill="#ebebeb" d="M3.5 10.494l.257-.429-.119-.07H3.5v.5zm0-5.996v.5h.138l.12-.071-.258-.429zm5-2.998H9a.5.5 0 00-.757-.429L8.5 1.5zm0 11.992l-.257.429A.5.5 0 009 13.492h-.5zm2.94-7.763l-.354-.353-.707.707.354.354.706-.708zm2.12 3.534l.354.353.707-.707-.354-.353-.707.707zm.708-2.826l.353-.354-.707-.707-.353.353.707.708zm-3.535 2.119l-.354.353.707.707.354-.353-.707-.707zM3.5 9.994h-2v1h2v-1zm-2 0a.499.499 0 01-.5-.5H0c0 .83.671 1.5 1.5 1.5v-1zm-.5-.5V5.498H0v3.998h1zm0-3.997c0-.276.223-.499.5-.499v-1c-.829 0-1.5.67-1.5 1.5h1zm.5-.499h2v-1h-2v1zm2.257-.071l5-2.998-.514-.858-5 2.998.514.858zM8 1.5v11.992h1V1.5H8zm.757 11.563l-5-2.998-.514.858 5 2.998.514-.858zm1.976-6.626l2.827 2.826.707-.707-2.828-2.827-.707.708zm2.828-.708l-2.828 2.827.707.707 2.828-2.826-.707-.708z"></path>
                </svg>
            )}
        </button>
    );
}

const SideBar = forwardRef((_props, ref) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
        return {
            openSideBar() {
                if (sidebarRef.current) {
                    sidebarRef.current.setAttribute('data-active', '');
                }
            }
        }
    });

    function handleBarClick(e:React.MouseEvent) {
        if (e.target === sidebarRef.current) {
            if (sidebarRef.current) sidebarRef.current.removeAttribute('data-active');
        }
    }

    return (
        <div ref={sidebarRef} className="sidebar-modal" onClick={handleBarClick}>
            <div className="sidebar-container">
                <section className="audio">
                    <span>Music</span>
                    <MusicBtn/>
                    <span>SFX</span>
                    <SfxBtn/>
                </section>
                <section className="sources"></section>
            </div>
        </div>
    );
});

export default SideBar;
