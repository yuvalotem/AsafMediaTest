const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sentenceSchema = new Schema({
    title: String,
    href: String,
    description: String
})

const Sentence = mongoose.model('Sentence', sentenceSchema)

module.exports = Sentence