import {makeAutoObservable} from "mobx";
import UserService from "../services/UserService";
import UserStore from "./UserStore";

class ProfileStore {
    name = ''
    file = null

    isLoading = false
    succeed = false
    message = ''

    constructor() {
        makeAutoObservable(this)
    }

    reset() {
        this.name = ''
        this.file = null

        this.isLoading = false
        this.succeed = false
        this.message = ''
    }

    setFile(file) {
        this.file = file
        console.log(file)
    }

    setName(name) {
        this.name = name
        console.log(name)
    }

    submitUpdate() {
        const form = new FormData()

        form.append('file', this.file)
        form.append('name', this.name)

        this.isLoading = true
        UserService.updateProfile(form)
            .then(res => {
                UserStore.update()
                this.succeed = true
                this.isLoading = false
            })
            .catch(err => {
                this.message = err?.response.data.message || 'Произошла ошибка'
            })
    }
}

export default new ProfileStore()