const y2 = require("y2mate-api");
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Api Working')
})

app.get('/api', (req, res) => {
    var url = req.query.url;
    res.send(y2.GetVideo(url)
        .then(data => {
            console.log(data)
        }))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

