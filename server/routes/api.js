const express = require('express')
const Sentence = require('../DB/Sentence')
const Log = require('../DB/Log')
var ip = require("ip");

const route = express()

route.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

route.get('/sentence', async function (req, res){
    const Sentences = await Sentence.find({})
    res.send(Sentences)
})

route.get("/log", async (req, res) => {
    const newLog = await Log.find({})
    res.send(newLog)
})

route.post("/log", async (req, res) => {
    const { action } = req.body
    const newLog = new Log({
        IP: ip.address(),
        timeStamp: Date.now(),
        action: action
    })
    await newLog.save()
    res.send(newLog)
})

route.delete('/Sentence/:id', async function (req, res){
    const {id} = req.params
    const removed = await Sentence.findByIdAndRemove(id)
    res.send(removed)
})

module.exports = route