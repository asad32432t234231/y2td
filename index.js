const y2 = require("./video");
const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Api Working')
})

app.get('/api', (req, res) => {
    var url = req.query.url;
    y2.video(url).then(response => {
        res.json(response)
    });



})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})