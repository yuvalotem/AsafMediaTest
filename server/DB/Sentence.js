const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sentenceSchema = new Schema({
    number: Number,
    sentence: String
})

const Sentence = mongoose.model('Sentence', sentenceSchema)

module.exports = Sentence