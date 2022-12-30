import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import DashboardStore from "../../../../../store/DashboardStore";
import Cover from "../../../../UI/Cover/Cover";
import s from './AlbumSingle.module.css'
import UserStore from "../../../../../store/UserStore";
import Modal from "../../../../UI/Modal/Modal";
import input from "./../../../authStyles.module.css"
import AlbumSingleStore from "./AlbumSingleStore";

const AlbumSingle = observer(() => {
    const {id} = useParams()
    const {oneAlbum, isLoading, getOne, reset} = DashboardStore
    const {user} = UserStore
    const {title, message, succeed, deleted} = AlbumSingleStore.data

    const nav = useNavigate()

    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)

    useEffect(() => {
        getOne(id)
        return () => {
            reset()
        }
    }, [])

    useEffect(() => {
        getOne(id)
    }, [succeed])

    useEffect(() => {
        if (deleted) {
            nav('/')
        }
    }, [deleted])

    const handleDelete = () => {
        setDeleteVisible(true)
    }

    const handleDeleteConfirm = () => {
        AlbumSingleStore.delete(id)
    }

    const handleUpdateClick = () => {
        AlbumSingleStore.reset()
        setVisible(true)
    }

    const handleUpdateChange = (e) => {
        const {name, value} = e.target
        if (name === 'image') {
            AlbumSingleStore.setValue(name, e.target.files[0])
        } else {
            AlbumSingleStore.setValue(name, value)
        }
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        AlbumSingleStore.submitUpdate(id)
    }

    return (
        <div className={s.wrapper}>


            <Modal visible={visible} setVisible={setVisible}>
                {succeed ? (
                    <h1>Успешно обновлено</h1>
                ) : (
                    <form onSubmit={handleUpdateSubmit}>
                        <div className={input.inputs}>
                            <label>Новое название</label>
                            <input type='text' name='title' value={title}
                                   placeholder='(без изменений)'
                                   onChange={handleUpdateChange}/>
                        </div>
                        <div className={input.inputs}>
                            <label>Новая обложка</label>
                            <input type='file' name='image'
                                   accept='image/*'
                                   onChange={handleUpdateChange}/>
                        </div>
                        <div className={input.inputs}>
                            <button disabled={isLoading}>Обновить</button>
                        </div>
                        <p>{message}</p>
                    </form>
                )}
            </Modal>

            <Modal visible={deleteVisible} setVisible={setDeleteVisible}>
                <p>Вы собираетесь удалить альбом. Вы уверены?</p>
                <div className={input.inputs}>
                    <button disabled={isLoading} onClick={handleDeleteConfirm}>Да, удалить</button>
                </div>
            </Modal>


            {isLoading ? (
                <h1></h1>
            ) : (
                <>
                    <div className={s.head}>
                        <Cover size='300px' cover={oneAlbum.image}/>
                        <div className={s.headInfo}>
                            <div className={s.text}>
                                <p>{user.name}</p>
                                <h1>{oneAlbum.title}</h1>
                            </div>
                            <div className={s.coverButtons}>
                                <button onClick={handleUpdateClick}>Редактировать</button>
                                <button onClick={handleDelete}>Удалить</button>
                            </div>
                        </div>
                    </div>
                    <h1>Треки:</h1>
                    <div className={s.grid}>
                        <div className={s.headers}>
                            <p>Название</p>
                            <p>Имя проекта</p>
                            <p>Статус</p>
                        </div>
                        {oneAlbum.tracks.map(track =>
                            <div key={track._id} className={s.element}>
                                <p>
                                    <h4>{track.title} {track.isExplicit && <b className={s.explicit}>E</b>}</h4>
                                    {track.featuring && ` ft. ${track.featuring}`}
                                </p>
                                <p>проект тут</p>
                                <p>Статус трека</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
});

export default AlbumSingle;