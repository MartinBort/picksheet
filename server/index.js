require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

const User = require('./models/user');
const Event = require('./models/event');

const dbURI = `mongodb+srv://picksheet_server:${process.env.MONGO_DB_PASSWORD}@cluster0.zdlkt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.set('useCreateIndex', true);
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		console.log('connected to Mongo DB');
		// listen on the port
		app.listen(port);
	})
	.catch((err) => console.log(err));

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send(`Hi! Server is listening on port ${port}`);
});

app.post('/users', (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});

	user
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((e) => {
			let errMssg;
			if (e.hasOwnProperty('code') && e.code === 11000) {
				errMssg = 'Username or email already exists';
			} else if (e.hasOwnProperty('message')) {
				errMssg = e.message;
			} else {
				errMssg = e;
			}
			res.status(400).send(errMssg);
		});
});

app.get('/users/:username', (req, res) => {
	const username = req.params.username;
	User.find({ username: username }, 'username email createdAt')
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(404).send('User does not exist');
		});
});

app.post('/events', (req, res) => {
	const event = new Event({
		name: req.body.name,
		datetime: req.body.datetime,
		fights: req.body.fights,
	});

	event
		.save()
		.then((result) => {
			res.send(result);
		})
		.catch((e) => {
			console.log(e);
		});
});

app.get('/events/:id', (req, res) => {
	const id = req.params.id;
	Event.find({ _id: id }, '_id name datetime fights')
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(404).send('Event does not exist');
		});
});

app.post('/events/:id', (req, res) => {
	const id = req.params.id;
	const updatedEvent = req.body;

	Event.findOneAndUpdate({ _id: id }, updatedEvent, {
		new: true,
	}).then((updatedItem) => {
		console.log(updatedItem);
		res.send(updatedItem);
	});
});
