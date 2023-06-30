const express = require('express');
const router = express.Router();
const {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getTeamById,
} = require('../controller/playersControllers');

router.post('/', async (req, res) => {
  try {
    const newPlayer = await createPlayer(req.body);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/team/:id', async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await getTeamById(teamId);
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await getPlayerById(playerId);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    const updatedPlayer = req.body;
    const player = await updatePlayer(playerId, updatedPlayer);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    const deletedPlayer = await deletePlayer(playerId);
    res.json(deletedPlayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
