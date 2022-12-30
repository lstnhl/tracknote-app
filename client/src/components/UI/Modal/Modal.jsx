import React from 'react';
import s from './Modal.module.css'

const Modal = ({children, visible, setVisible}) => {

    const classes = [s.wrapper]

    if (visible) {
        classes.push(s.active)
    }

    const hide = () => {
        setVisible(false)
    }

    return (
        <div className={classes.join(' ')} onClick={hide}>
            <div className={s.innerContainer} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;