const housesController = require('./houses');
const usersController = require('./users');
const tasksController = require('./tasks');
const app = require('../index');

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the tasks api'
	}));

	//houses
	app.post('/api/houses', housesController.create);
	app.get('/api/houses', housesController.index);
	app.get('/api/houses/:houseId', housesController.show);
	app.put('/api/houses/:houseId', housesController.update);
	app.delete('/api/houses/:houseId', housesController.destroy);

	// users
	app.post('/api/houses/:houseId/users', usersController.create);
	app.post('/api/houses/:houseId/users/:userId', usersController.update);
	app.delete('/api/houses/:houseId/users/:userId', usersController.destroy);
	app.get('/api/houses/:houseId/users', usersController.index);
	app.get('/api/houses/:houseId/users/:userId', usersController.show);

	// tasks
	app.post('/api/houses/:houseId/tasks', tasksController.create);
	app.post('/api/houses/:houseId/tasks/:taskId', tasksController.update);
	app.delete('/api/houses/:houseId/tasks/:taskId', tasksController.destroy);
	app.get('/api/houses/:houseId/tasks', tasksController.index);
	app.get('/api/houses/:houseId/tasks/:taskId', tasksController.show);
};
