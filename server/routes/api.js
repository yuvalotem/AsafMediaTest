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
    const sentence = await Sentence.find({number: Math.floor(Math.random() * 5) + 1})
    res.send(sentence)
})
route.get('/logs', async function (req, res){
    const logs = await Log.find({})
    res.send(logs)
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

module.exports = route