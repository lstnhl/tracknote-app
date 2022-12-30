import React from 'react';
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import s from "./Avatar.module.css"

const Avatar = observer(({size}) => {
    const STATIC = 'http://localhost:5000/avatars/'
    const {avatar} = UserStore.user

    return (
        <div className={s.imageWrapper} style={{width: size, height: size}}>
            <img src={STATIC + avatar}/>
        </div>
    );
});

export default Avatar;