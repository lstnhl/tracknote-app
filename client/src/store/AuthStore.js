import {makeAutoObservable} from "mobx";
import UserService from "../services/UserService";

class AuthStore {
    data = {}
    message = ''
    succeed = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    reset() {
        this.data = {
            name: '',
            username: '',
            password: ''
        }
        this.message = ''
        this.succeed = false
        this.isLoading = false
    }

    setData(e) {
        this.data = ({
            ...this.data,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(type) {
        this.isLoading = true
        if (type === 'login') {
            UserService.login(this.data.username, this.data.password)
                .then(res => {
                    this.succeed = true
                    this.message = ''
                })
                .catch(err => {
                    this.message = err.response.data.message
                })
                .finally(() => {
                    this.isLoading = false
                })
        }

        if (type === 'register') {
            UserService.register(this.data)
                .then(res => {
                    this.succeed = true
                    this.message = ''
                })
                .catch(err => {
                    this.message = err.response.data.message
                })
                .finally(() => {
                    this.isLoading = false
                })
        }
    }
}

export default new AuthStore()