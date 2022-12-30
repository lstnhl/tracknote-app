import React from 'react';
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import s from "./Cover.module.css"

const Cover = observer(({size, cover}) => {
    const STATIC = 'http://localhost:5000/albums/'

    return (
        <div className={s.imageWrapper} style={{width: size, height: size}}>
            <img src={STATIC + cover}/>
        </div>
    );
});

export default Cover;