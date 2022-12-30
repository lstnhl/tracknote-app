import axios from "axios";
import {decodeToken} from 'react-jwt';
import authHeader from "./AuthHeader";

class UserService {
    API = process.env.REACT_APP_API_SERVER

    login(username, password) {
        return axios.post(this.API + 'auth/login', {
            username,
            password
        }, {
            withCredentials: true,
            credentials: 'include'
        }).then(res => {
            const user = JSON.stringify(res.data.user)
            localStorage.setItem('user', user)
            return 'SUCCESS'
        })
    }

    register(data) {
        return axios.post(this.API + 'auth/register', data)
    }

    logout() {
        localStorage.removeItem('user')
        return axios.post(this.API + 'auth/logout')
    }

    getUserInfo() {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user)
        }

        return null
    }

    updateProfile(data) {
        return axios.put(this.API + 'user/profile', data, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(res => {
                const user = JSON.stringify(res.data.user)
                localStorage.setItem('user', user)
            })
    }
}

export default new UserService()