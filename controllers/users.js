const express = require('express')
const router = express.Router();
const Joi = require('joi');

const users = [
	{ id: 1, name: 'marina'},
	{ id: 2, name: 'eric'}
]

router.get('/', (req, res) => {
	res.send('Hello World');

});

router.get('/api/users', (req, res) => {
	res.send(users);
})

router.get('/api/users/:id', (req, res) => {
	let user = users.find((u) => { 
		return u.id === parseInt(req.params.id)
	 })
	
	if (!user) return res.status(404).send('The user with the given id was not found');

	res.send(user);
});

router.post('/api/users', (req, res) => {
	const { error } = validateUser(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const user = {
		id: users.length + 1,
		name: req.body.name
	}

	users.push(user);
	res.send(user);
});

router.put('/api/users/:id', (req, res) => {
	let user = users.find((u) => { 
		return u.id === parseInt(req.params.id)
	 })
	
	if (!user) return res.status(404).send('The user with the given id was not found');

	const { error } = validateUser(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	user.name = req.body.name
	res.send(user);
})

router.delete('/api/users/:id', (req, res) => {
	let user = users.find((u) => { 
		return u.id === parseInt(req.params.id)
	 })
	
	if (!user) return res.status(404).send('The user with the given id was not found');

	const index = users.indexOf(user);
	console.log('index of user ' + index);

	users.splice(index, 1);
	console.log('after deleteion, users array' + users);

	res.send(user);
});

function validateUser(user) {
	const schema = {
		name: Joi.string().min(2).required()
	};

	return Joi.validate(user, schema);
}

module.exports = router;

