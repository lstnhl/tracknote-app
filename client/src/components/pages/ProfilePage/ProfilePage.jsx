import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import UserStore from "../../../store/UserStore";
import s from './ProfilePage.module.css'
import input from './../authStyles.module.css'
import Avatar from "../../UI/Avatar/Avatar";
import Modal from "../../UI/Modal/Modal";
import ProfileStore from "../../../store/ProfileStore";

const ProfilePage = observer(() => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        ProfileStore.reset()
    }, [])

    const handleEditClick = (e) => {
        ProfileStore.succeed = false
        setVisible(true)
    }

    const handleEditName = (e) => {
        ProfileStore.setName(e.target.value)
    }

    const handleEditFile = (e) => {
        ProfileStore.setFile(e.target.files[0])
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        ProfileStore.submitUpdate()
    }

    const {name, roles} = UserStore.user
    return (
        <div className={s.wrapper}>


            <Modal visible={visible} setVisible={setVisible}>
                {ProfileStore.succeed ? (
                    <>Данные успешно обновлены</>
                ) : (
                    <form onSubmit={handleEditSubmit}>
                        <div className={input.inputs}>
                            <label>Новое имя</label>
                            <input type='text' name='name' value={ProfileStore.name} onChange={handleEditName}
                                   placeholder='без изменений'/>
                        </div>

                        <div className={input.inputs}>
                            <label>Новая аватарка</label>
                            <input type='file' accept='image/*' name='file' onChange={handleEditFile}/>
                        </div>
                        <div className={input.inputs}>
                            <button disabled={ProfileStore.isLoading}>Обновить</button>
                        </div>
                        <b>{ProfileStore.message}</b>
                    </form>
                )}
            </Modal>


            <div className={s.part}>
                <Avatar size='200px'/>
            </div>
            <div className={s.part}>
                <h1>{name}</h1>
                <p>Роли: <b>{roles}</b></p>
                <button onClick={handleEditClick}>Редактировать</button>
            </div>
        </div>
    );
})

export default ProfilePage;