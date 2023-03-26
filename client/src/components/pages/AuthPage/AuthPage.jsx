import React, {useEffect} from 'react';
import s from "../authStyles.module.css"
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "../../../store/AuthStore";
import UserStore from "../../../store/UserStore";

const AuthPage = observer(({action}) => {
    const nav = useNavigate()

    let formItems = {}
    if (action === 'login') {
        formItems = {
            title: 'Вход',
            buttonLabel: 'Войти',
            items: [
                {
                    label: 'Логин',
                    type: 'text',
                    name: 'username',
                    value: AuthStore.data.username
                },
                {
                    label: 'Пароль',
                    type: 'password',
                    name: 'password',
                    value: AuthStore.data.password
                },
            ]
        }
    } else {
        formItems = {
            title: 'Регистрация',
            buttonLabel: 'Зарегистрироваться',
            items: [
                {
                    label: 'Никнейм',
                    type: 'text',
                    name: 'name',
                    value: AuthStore.data.name
                },
                {
                    label: 'Логин',
                    type: 'text',
                    name: 'username',
                    value: AuthStore.data.username
                },
                {
                    label: 'Пароль',
                    type: 'password',
                    name: 'password',
                    value: AuthStore.data.password
                },
            ]
        }
    }

    useEffect(() => {
        if (UserStore.isLogged) nav('/')
        AuthStore.reset()
    }, [action])

    useEffect(() => {
        if (AuthStore.succeed) nav('/')
        UserStore.update()
        AuthStore.reset()
    }, [AuthStore.succeed])

    const handleChange = (e) => {
        AuthStore.setData(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        AuthStore.handleSubmit(action)
    }

    return (
        <>
            <h1>{formItems.title}</h1>
            <form className={s.form_wrapper} onSubmit={handleSubmit}>
                {formItems.items.map(item =>
                    <div className={s.inputs}>
                        <label>{item.label}</label>
                        <input type={item.type} name={item.name} value={item.value} onChange={handleChange}/>
                    </div>
                )}
                <div className={s.inputs}>
                    <button disabled={AuthStore.isLoading}>{formItems.buttonLabel}</button>
                </div>
            </form>
            {AuthStore.message && <h1 className={s.message}>{AuthStore.isLoading ? '...' : AuthStore.message}</h1>}
            {AuthStore.errors.map(error =>
                <p key={error?.param}>{error?.msg}</p>
            )}
        </>
    );
})

export default AuthPage;