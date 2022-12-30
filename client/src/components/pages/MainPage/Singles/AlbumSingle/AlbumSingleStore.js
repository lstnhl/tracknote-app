import {makeAutoObservable} from "mobx";
import AlbumService from "../../../../../services/AlbumService";

class AlbumSingleStore {
    constructor() {
        makeAutoObservable(this)
    }

    data = {}

    reset() {
        this.data = {
            title: '',
            image: '',

            isLoading: false,
            succeed: false,
            message: '',

            deleted: false,
        }
    }

    setValue(name, value) {
        this.data[name] = value
    }

    submitUpdate(id) {
        const form = new FormData()

        form.append('image', this.data.image)
        form.append('title', this.data.title)

        this.setValue('isLoading', true)

        AlbumService.update(id, form)
            .then(res => {
                this.setValue('succeed', true)
            })
            .catch(err => {
                this.message = err?.response.data.message || 'Произошла ошибка'
            })
            .finally(() => {
                this.setValue('isLoading', false)
            })
    }

    delete(id) {
        AlbumService.delete(id)
            .then(() => {
                this.reset()
                this.setValue('deleted', true)
            })
            .catch(err => {
                this.message = err?.response.data.message || 'Произошла ошибка'
            })
    }
}

export default new AlbumSingleStore()