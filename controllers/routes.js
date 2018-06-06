const housesController = require('./houses')
const app = require('../index');

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the tasks api'
	}));

	app.post('/api/houses', housesController.create);
};

