const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = 5003;

app.use(express.static(__dirname + '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Starting Ptable Bingo server...`);
    console.log(`Running on port ${port}!`);
    console.log(`Connect through a browser at \"http://localhost:${port}\"!`);
});

app.get('/hello', function (req, res) {
    res.send("mukyu!");
});

app.get('*', function(req, res){
    res.status(404).send("f i l e  n o t  f o u n d");
});