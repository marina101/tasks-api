const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./controllers/users'));

require('./controllers/routes')(app);
app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome!'
}));


module.exports = app;