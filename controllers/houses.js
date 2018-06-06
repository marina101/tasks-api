const House = require('../models').House;

module.exports = {
  create(req, res) {
  	return House.create({
      name: req.body.name
  	}).then(house => res.status(201).send(house))
  	.catch(error => res.status(400).send(error));
  },
};
