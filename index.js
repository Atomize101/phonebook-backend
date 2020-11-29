const express = require('express');
const app = express();

let contacts = [
	{
		id: 1,
		content: 'Chris Patrick',
		date: '2019-05-30T17:30:31.098Z',
		important: true,
	},
	{
		id: 1,
		content: 'Sarah Patrick',
		date: '2019-05-30T18:39:34.091Z',
		important: true,
	},
	{
		id: 1,
		content: 'Orangie Patrick',
		date: '2019-05-30T19:20:14.298Z',
		important: false,
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/contacts', (request, response) => {
	response.json(contacts);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
