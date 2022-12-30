import mongoose, {Schema} from "mongoose"

const Album = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, default: ''},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    tracks: [{type: Schema.Types.ObjectId, ref: 'Track'}]
})

export default mongoose.model('Album', Album)