const House = require('../models').House;
const User = require('../models').User;
const Task = require('../models').Task;

module.exports = {
  create(req, res) {
  	return House.create({
      name: req.body.name
  	}).then(house => res.status(201).send(house))
  	.catch(error => res.status(400).send(error));
  },

  index(req, res) {
  	return House
  	  .findAll({
  	  	include: [{
  	  		model: User,
  	  		as: 'users'
  	  	}],
  	  })
  	  .then(houses => res.status(200).send(houses))
  	  .catch(error => res.status(400).send(error))
  },

  show(req, res) {
  	return House
  	  .findById(req.params.houseId, {
  	  	include: [{
  	  		model: User,
  	  		as: 'users',
  	  	},
  	  	{
  	  		model: Task,
  	  		as: 'tasks'
  	  	}],
  	  })
  	  .then(house => {
  	  	if (!house) {
  	  		return res.status(404).send({
  	  			message: 'House not found'
  	  		});
  	  	}

  	  	return res.status(200).send(house);
  	  })
  	  .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  	return House
  	  .findById(req.params.houseId, {
  	  	include: [{
  	  		model: User,
  	  		as: 'users'
  	  	}],
  	  })
  	  .then(house => {
  	  	if (!house) {
  	  		return res.status(404).send({
  	  			message: 'House not found'
  	  		});
  	  	}

  	  	return house
  	  	  .update({
  	  	  	name: req.body.name || house.name,
  	  	  	email: req.body.email || house.email
  	  	  })
  	  	  .then(() => res.status(200).send(house))
  	  	  .catch((error) => res.status(400).send(error))
  	  })
  	  .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
  	return House
  	  .findById(req.params.houseId)
  	  .then(house => {
  	  	if (!house) {
  	  		return res.status(400).send({
  	  			message: 'House not found'
  	  		});
  	  	}
  	  	return house
  	  	  .destroy()
  	  	  .then(() => res.status(200).send({ message: 'House delete successfully'}))
  	  	  .catch(error => res.status(400).send(error));
  	  })
  	  .catch(error => res.status(400).send(error));
  }
};
