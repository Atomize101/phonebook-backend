const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('build'));
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(
	morgan('tiny', {
		skip: (req) => {
			return req.method == 'POST';
		},
		stream: process.stdout,
	})
);

morgan.token('reqData', (req) => {
	return JSON.stringify({ name: req.body.name, number: req.body.number });
});

var POSTLoggerFormat = ':method :url :status :res[content-length] - :response-time ms :reqData';

app.use(
	morgan(POSTLoggerFormat, {
		skip: (req) => {
			return req.method != 'POST';
		},
		stream: process.stdout,
	})
);

let persons = [
	{
		id: 1,
		name: 'Chris Patrick',
		number: '586 444 2222',
	},
	{
		id: 2,
		name: 'Sarah Patrick',
		number: '586 666 2222',
	},
	{
		id: 3,
		name: 'Orangie Patrick',
		number: '586 666 8888',
	},
	{
		id: 4,
		name: 'Dan Abramov',
		number: '222 425 8888',
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/info', (request, response) => {
	response.send(`<p>There are ${persons.length} contacts stored.</p> <p>${new Date()}</p>`);
});

app.get('/api/persons', (request, response) => {
	response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (req, res) => {
	const body = req.body;
	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'content missing',
		});
	}

	const checkExists = persons.findIndex((person) => person.name.toLowerCase() == body.name.toLowerCase());
	if (checkExists > 0) {
		console.log('error: name already exists');
		return res.status(409).json({
			error: 'name already exists',
		});
	}

	const person = {
		id: getRandomInt(10000),
		name: body.name,
		number: body.number || false,
	};
	persons = persons.concat(person);

	res.json(body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
