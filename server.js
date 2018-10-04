const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const info = require('./routes/info-routes');

app.use('/info', info);

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server up on port ${port}...`);
});

