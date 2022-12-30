import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import DashboardStore from "../../../store/DashboardStore";
import AlbumItem from "./AlbumItem/AlbumItem";
import s from './MainPage.module.css'
import {Link} from "react-router-dom";

const MainPage = observer(() => {
    const {user, isLogged} = UserStore
    const {albums, isLoading, getAll, reset} = DashboardStore

    useEffect(() => {
        getAll()
        return () => {
            reset()
        }
    }, [])

    return (
        <div className={s.wrapper}>
            <h1>
                {isLogged ? 'Ваши релизы' : 'Войдите, чтобы начать работу'}
                {isLoading && ' загружаются...'}
            </h1>
            {!isLoading && albums.map(album =>
                <Link to={`/album/${album._id}`}>
                    <AlbumItem key={album._id} album={album} nickname={user.name}/>
                </Link>
            )}
        </div>
    );
})

export default MainPage;