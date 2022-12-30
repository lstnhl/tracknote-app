import React from 'react';
import s from './Content.module.css'
import MainPage from "./MainPage/MainPage";
import {Route, Routes} from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import AlbumSingle from "./MainPage/Singles/AlbumSingle/AlbumSingle";


const Content = () => {
    const routes = [
        {
            key: 0,
            path: '/',
            element: <MainPage/>
        },
        {
            key: 1,
            path: '/login',
            element: <AuthPage action='login'/>
        },
        {
            key: 2,
            path: '/register',
            element: <AuthPage action='register'/>
        },
        {
            key: 3,
            path: '/profile',
            element: <ProfilePage/>
        },
        {
            key: 4,
            path: '/album/:id',
            element: <AlbumSingle/>
        }
    ]

    return (
        <main className={s.wrapper}>
            <div className={s.content}>
                <Routes>
                    {/*{routes.map(r => (<Route key={r.id} path={r.path} element={r.element}/>))}*/}
                    {routes.map(r => (<Route {...r}/>))}
                    <Route path='*' element={<h1>NOT FOUND))))</h1>}/>
                </Routes>
            </div>
        </main>
    );
};

export default Content;