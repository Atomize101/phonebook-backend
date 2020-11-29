const express = require('express');
const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
