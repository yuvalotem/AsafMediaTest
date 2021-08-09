const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema({
    action: String,
    IP: String,
    timeStamp: Date
})

const Log = mongoose.model('Log', logSchema)

module.exports = Log