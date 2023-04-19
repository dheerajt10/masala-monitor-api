const path= require('path');
const express = require('express');
const bodyParser = require('body-parser');


const routes = require('./routes/main');
const helmet = require("helmet");

const email = require('./controllers/email');


const app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));


app.use(helmet());
app.use(express.static(path.join(__dirname, 'public'))); 


app.use(routes);
const port = process.env.PORT||3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
