import {makeAutoObservable} from "mobx";
import AlbumService from "../services/AlbumService";

class DashboardStore {
    albums = []
    oneAlbum = {
        image: '',
        tracks: []
    }
    oneTrack = {}

    isLoading = false
    message = ''

    constructor() {
        makeAutoObservable(this)
    }

    reset = () => {
        this.albums = []
        this.oneAlbum = {
            image: '',
            tracks: []
        }
        this.oneTrack = {}

        this.isLoading = false
        this.message = ''
    }

    getAll = () => {
        this.isLoading = true
        AlbumService.getAll()
            .then(res => {
                this.albums = res.data
            })
            .catch(err => {
                this.message = err.response.data.message
            })
            .finally(() => {
                this.isLoading = false
            })
    }

    getOne = (id) => {
        this.isLoading = true
        AlbumService.getOne(id)
            .then(res => {
                this.oneAlbum = res.data
            })
            .catch(err => {
                this.message = err.response.data.message
            })
            .finally(() => {
                this.isLoading = false
            })
    }
}

export default new DashboardStore()