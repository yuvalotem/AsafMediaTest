const express = require('express')
// const Image = require('../../Image')

const route = express()

// route.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

route.get('/sentence', async function (req, res){
    const images = await Image.find({})
    res.send(images)
})

route.post("/log", async (req, res) => {
    const i = new Image(req.body)
    await i.save()
    res.send(i)
})

route.delete('/image/:id', async function (req, res){
    const {id} = req.params
    const removed = await Image.findByIdAndRemove(id)
    res.send(removed)
})

module.exports = route