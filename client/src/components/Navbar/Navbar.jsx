import React from 'react';
import s from './Navbar.module.css'
import {Link, NavLink} from "react-router-dom";
import './activeLink.css'
import {observer} from "mobx-react-lite";
import UserStore from "../../store/UserStore";
import Avatar from "../UI/Avatar/Avatar";

const Navbar = observer(() => {

    let menu = []

    if (!UserStore.isLogged) {
        menu = [
            {
                key: 0,
                name: 'Вход',
                to: '/login'
            },
            {
                key: 1,
                name: 'Регистрация',
                to: '/register'
            }
        ]
    } else {
        menu = [
            {
                key: 0,
                name: 'Выход',
                to: '/login',
                onClick: () => {
                    UserStore.logout()
                }
            },
        ]
    }

    return (
        <nav className={s.wrapper}>
            <div className={s.content}>
                <div>
                    <Link to='/'>TRACKNOTE</Link>
                </div>
                <div className={s.part}>
                    {UserStore.isLogged &&
                        <NavLink className={`${s.navlink} ${s.profile}`} to='/profile'>
                            <p>{UserStore.user.name}</p>
                            <Avatar size='40px'/>
                        </NavLink>
                    }
                    {menu.map(item =>
                        <NavLink className={s.navlink} {...item}>
                            <p>{item.name}</p>
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
})

export default Navbar;