import { useEffect, useState } from "react";
type PopupProps = {
    isVisible: boolean;
    onClose: () => void; // Add an onClose prop
    children: React.ReactNode;
};

const Popup = ({ isVisible, onClose, children }:PopupProps) => {
    const [isRendered, setIsRendered] = useState(isVisible);
    useEffect(() => {
        if (isVisible) {
            setIsRendered(true);
        } else {
            const timeout = setTimeout(() => setIsRendered(false), 300); // Match transition duration
            return () => clearTimeout(timeout);
        }
    }, [isVisible]);
    if (!isRendered) return null;

    return (
        <div className={`fixed top-0 left-0 h-screen w-screen flex justify-center max-md:items-end  md:items-center bg-black/10 backdrop-blur-sm z-50 transition-all ease-in-out duration-400 invisible  ${isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible'}`}>
            <div className={`w-auto h-auto bg-white rounded shadow-base shadow-md relative max-md:flex max-md:justify-center ${isVisible ? 'slide-in-bottom' : 'slide-out-bottom'}`}>
                <button
                    onClick={onClose} // Trigger onClose when clicked
                    className="bg-white text-xl w-8 h-8 absolute  md:-right-10 max-md:-top-16 md:-top-4 rounded-full flex justify-center items-center"
                >
                    <i className="bx bx-plus rotate-45 text-red-500"></i>
                </button>
                <div className="max-md:flex max-md:items-start">{children}</div>
            </div>
        </div>
    );
};

export default Popup;
