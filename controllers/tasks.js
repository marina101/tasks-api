const Task = require('../models').Task;
const moment = require('moment');

module.exports = {
	create(req,res) {
		let theEndOfTime = moment().day('monday').hour(0).minute(0).second(0).add(1, 'weeks');
		return Task
			.create({
				name: req.body.name,
				done: false,
				houseId: req.params.houseId,
				userId: req.body.userId || null,
				endAt: theEndOfTime.clone(),
				startAt: theEndOfTime.subtract(1, 'weeks'),
				taskType: req.body.type || 'weekly'
			})
			.then(task => res.status(201).send(task))
			.catch(error => res.status(400).send(error));
	},

	update(req, res) {
		return Task
		  .find({
		  	where: {
		  		id: req.params.taskId,
		  		houseId: req.params.houseId
		  	},
		  })
		  .then(task => {
		  	if (!task) {
		  		return res.status(404).send({
		  			message: 'Task not found'
		  		})
		  	}

		  	return task
		  	  .update({
		  	  	name: req.body.name || task.name,
						done: req.body.done || task.done,
						userId: req.body.userId || task.userId,
						taskType: req.body.type || task.taskType
		  	  })
		  	  .then(updatedTask => res.status(200).send(updatedTask))
		  	  .catch(error => res.status(400).send(error));

		  })
		  .catch(error => res.status(400).send(error));
	},

	destroy(req, res) {
		return Task
		  .find({
		  	where: {
		  		id: req.params.taskId,
		  		houseId: req.params.houseId
		  	}
		  })
		  .then(user => {
		  	if (!task) {
		  		return res.status(404).send({
		  			message: 'Task not found'
		  		})
		  	}

		  	return task
		  	  .destroy()
		  	  .then(() => res.status(200).send({ message: 'Task deleted successfully '}))
		  	  .catch(error => res.status(400).send(error));
		  })
		  .catch((error) => res.status(400).send(error));
	},

	index(req, res) {
  	return Task
  	  .findAll({
		  	where: {
		  		houseId: req.params.houseId
		  	}
  	  })
  	  .then(tasks => res.status(200).send(tasks))
  	  .catch(error => res.status(400).send(error))
  },

  show(req, res) {
  	return Task
  	  .find({
		  	where: {
		  		id: req.params.taskId,
		  		houseId: req.params.houseId
		  	},
		  })
  	  .then((task) => {
  	  	if (!task) {
  	  		return res.status(404).send({
  	  			message: 'Task not found'
  	  		});
  	  	}

  	  	return res.status(200).send(task);
  	  })
  	  .catch(error => res.status(400).send(error));
  },
};