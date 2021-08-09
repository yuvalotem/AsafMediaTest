const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'build')));

const connect = process.env.MONGODB_URI || "mongodb://localhost/Image"

mongoose.connect(connect, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

app.use('/', api)


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 4000
app.listen(port, function(req, res){
    console.log('running on ' + port);
})