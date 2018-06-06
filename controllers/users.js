const User = require('../models').User;

module.exports = {
	create(req,res) {
		return User
			.create({
				name: req.body.name,
				email: req.body.email,
				houseId: req.params.houseId
			})
			.then(user => res.status(201).send(user))
			.catch(error => res.status(400).send(error));
	},

	update(req, res) {
		return User
		  .find({
		  	where: {
		  		id: req.params.userId,
		  		houseId: req.params.houseId
		  	},
		  })
		  .then(user => {
		  	if (!user) {
		  		return res.status(404).send({
		  			message: 'User not found'
		  		})
		  	}

		  	return user
		  	  .update({
		  	  	name: req.body.name || user.name,
		  	  	email: req.body.email || user.email
		  	  })
		  	  .then(updatedUser => res.status(200).send(updatedUser))
		  	  .catch(error => res.status(400).send(error));

		  })
		  .catch(error => res.status(400).send(error));
	},

	destroy(req, res) {
		return User
		  .find({
		  	where: {
		  		id: req.params.userId,
		  		houseId: req.params.houseId
		  	}
		  })
		  .then(user => {
		  	if (!user) {
		  		return res.status(404).send({
		  			message: 'User not found'
		  		})
		  	}

		  	return user
		  	  .destroy()
		  	  .then(() => res.status(200).send({ message: 'User deleted successfully '}))
		  	  .catch(error => res.status(400).send(error));
		  })
		  .catch((error) => res.status(400).send(error));
	},

	index(req, res) {
  	return User
  	  .findAll({
		  	where: {
		  		houseId: req.params.houseId
		  	}
  	  })
  	  .then(users => res.status(200).send(users))
  	  .catch(error => res.status(400).send(error))
  },

  show(req, res) {
  	return User
  	  .find({
		  	where: {
		  		id: req.params.userId,
		  		houseId: req.params.houseId
		  	},
		  })
  	  .then((user) => {
  	  	if (!user) {
  	  		return res.status(404).send({
  	  			message: 'User not found'
  	  		});
  	  	}

  	  	return res.status(200).send(user);
  	  })
  	  .catch(error => res.status(400).send(error));
  },
};