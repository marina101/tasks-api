const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const users = [
	{ id: 1, name: 'marina'},
	{ id: 2, name: 'eric'}
]

app.get('/', (req, res) => {
	res.send('Hello World');

});

app.get('/api/users', (req, res) => {
	res.send(users);
})

app.get('/api/users/:id', (req, res) => {
	let user = users.find((u) => { 
		return u.id === parseInt(req.params.id)
	 })
	
	if (!user) {
		res.status(404).send('The user with the given id was not found');
		return;
	}

	res.send(user);
});

app.post('/api/users', (req, res) => {
	const { error } = validateUser(req.body);

	if (error){
		res.status(400).send(error);
		return;
	}

	const user = {
		id: users.length + 1,
		name: req.body.name
	}

	users.push(user);
	res.send(user);
});

app.put('/api/users/:id', (req, res) => {
	let user = users.find((u) => { 
		return u.id === parseInt(req.params.id)
	 })
	
	if (!user) {
		res.status(404).send('The user with the given id was not found');
		return;
	}

	const { error } = validateUser(req.body);

	if (error){
		res.status(400).send(error);
		return;
	}

	user.name = req.body.name
	res.send(user);
})

function validateUser(user) {
	const schema = {
		name: Joi.string().min(2).required()
	};

	return Joi.validate(user, schema);
}


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`)); 