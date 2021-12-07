mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    role: {
        type: String
    },
    password: {
        type: String
    }

}, {
    collection: 'instructor'
});
module.exports = mongoose.model('instructor', userSchema)