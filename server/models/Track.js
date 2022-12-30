import mongoose, {Schema} from "mongoose"

const Track = new mongoose.Schema({
    title: {type: String, required: true},
    featuring: {type: String, default: ''},
    isExplicit: {type: Boolean, default: false},
    inAlbum: {type: Schema.Types.ObjectId, ref: 'Album'}
})

export default mongoose.model('Track', Track)