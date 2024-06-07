const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let db = [
    { id: 1, title: 'Why did the chicken cross the road?', comedian: 'Anonymous', year: 2000 }
];

// Get all jokes
app.get('/', (req, res) => {
    res.json(db);
});

// Add a new joke
app.post('/', (req, res) => {
    const newJoke = { ...req.body, id: db.length ? db[db.length - 1].id + 1 : 1 };
    db.push(newJoke);
    res.json(db);
});

// Update a joke
app.patch('/joke/:id', (req, res) => {
    const jokeId = parseInt(req.params.id, 10);
    const jokeIndex = db.findIndex(j => j.id === jokeId);

    if (jokeIndex !== -1) {
        db[jokeIndex] = { ...db[jokeIndex], ...req.body };
        res.json(db[jokeIndex]);
    } else {
        res.status(404).send('Joke not found');
    }
});

// Delete a joke
app.delete('/joke/:id', (req, res) => {
    const jokeId = parseInt(req.params.id, 10);
    const jokeIndex = db.findIndex(j => j.id === jokeId);

    if (jokeIndex !== -1) {
        const deletedJoke = db.splice(jokeIndex, 1);
        res.json(deletedJoke);
    } else {
        res.status(404).send('Joke not found');
    }
});

app.listen(port, () => {
    console.log(`Joke API server running at http://localhost:${port}`);
});
