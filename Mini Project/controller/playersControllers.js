const Player = require('../model/Players');
const axios = require('axios');

async function getAllPlayers() {
  try {
    const players = await Player.find();
    return players;
  } catch (error) {
    throw new Error('Failed to fetch all players');
  }
}

async function getPlayerById(id) {
  try {
    const numberId = parseInt(id);
    const response = await Player.findOne({id: numberId});
    return response;
  } catch (error) {
    throw new Error('Failed to fetch player');
  }
}

async function getTeamById(teamId) {
  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/teams/${teamId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch team');
  }
}

async function deletePlayer(playerId) {
  try {
  const numberId = parseInt(playerId)
  const deletedPlayer = await Player.findOneAndDelete({id: {$eq: numberId}})
  return deletedPlayer
  } catch (error) {
    throw new Error('Failed to delete player');
  }
}


async function createPlayer(player) {
  try {
    const newPlayer = await Player.create(player);
    return newPlayer;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create player');
  }
}

async function updatePlayer(playerId, updatedPlayer) {
  try {
    const numberId = parseInt(playerId);
  const player = await Player.findOneAndUpdate({id: {$eq: numberId}}, updatedPlayer, {new: true})
  return player
  } catch (error) {
    throw new Error('Failed to update player');
  }
}


module.exports = {
  getAllPlayers,
  getPlayerById,
  deletePlayer,
  createPlayer,
  updatePlayer,
  getTeamById
};
