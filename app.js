const express = require('express');
const mongoose = require('mongoose');
const playersRouter = require('./Mini Project/routes/routes');
const axios = require('axios');
const Player = require('./Mini Project/model/Players');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/nba_players', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
  populateDatabase();
});

app.use(express.json());

app.use('/players', playersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

async function populateDatabase() {
    try {
        const response = await axios.get('https://www.balldontlie.io/api/v1/players');

        const players = response.data.data;

        await Player.insertMany(players);
        console.log('Database populated successfully');
    } catch (error) {
        console.error('Failed to populate database:', error.message);
    }
}

