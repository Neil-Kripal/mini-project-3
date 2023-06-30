const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  position: String,
  team: {
    id: Number,
    abbreviation: String,
    city: String,
    conference: String,
    division: String,
    full_name: String,
    name: String,
  },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
