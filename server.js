const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const info = require('./controllers/info-routes');

app.use('/stops', info);

app.set('view engine', 'pug');

app.listen(port, () => {
    console.log(`Server up on port ${port}...`);
});

