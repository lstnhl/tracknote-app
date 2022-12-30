import {makeAutoObservable} from "mobx";
import UserService from "../services/UserService";

class UserStore {
    isLogged = false
    user = {}

    constructor() {
        makeAutoObservable(this)
        this.update()
    }

    update() {
        const user = UserService.getUserInfo()
        if (user) {
            this.user = user
            this.isLogged = true
        }
    }

    logout() {
        UserService.logout()
        this.isLogged = false
        this.user = {}
    }
}

export default new UserStore()