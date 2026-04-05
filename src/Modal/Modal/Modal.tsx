import React from "react";
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if(!isOpen) return null;

    const onOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div className={styles.overlay} onClick={onOverlayClick}>
            <div className={styles.modalContent}>
                
                {children}
            </div>
        </div>
    )
}



export default Modal;