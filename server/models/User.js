import mongoose, {Schema} from "mongoose"

const User = new mongoose.Schema({
    username: {type: String, required: true, lowercase: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ''},
    roles: {type: String, enum: ['USER', 'ADMIN'], default: 'USER'},
    albums: [{type: Schema.Types.ObjectId, ref: 'Album'}]
})

export default mongoose.model('User', User)