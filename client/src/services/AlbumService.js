import axios from "axios";

class AlbumService {
    API = process.env.REACT_APP_API_SERVER + 'album/'

    getAll() {
        return axios.get(this.API)
    }

    getOne(id) {
        return axios.get(this.API + id)
    }

    update(id, data) {
        return axios.put(this.API + id, data)
    }

    delete(id) {
        return axios.delete(this.API + id)
    }
}

export default new AlbumService()