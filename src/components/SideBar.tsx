import { useImperativeHandle, forwardRef, useRef } from "react";

export interface SideBarRef {
    openSideBar: () => void;
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
            <div className="sidebar-container"></div>
        </div>
    );
});

export default SideBar;
