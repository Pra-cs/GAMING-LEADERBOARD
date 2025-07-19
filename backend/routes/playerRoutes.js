const express = require('express');
const router = express.Router();
const {
  submitScore,
  getLeaderboard,
  getPlayerRank,
  getAllPlayers,
  updatePlayerScore,
  deletePlayer


} = require('../controllers/playerController');

router.post('/submit', submitScore);
router.get('/leaderboard', getLeaderboard);
router.get('/:username/rank', getPlayerRank);
router.get('/all', getAllPlayers);
router.put('/:id', updatePlayerScore);
router.delete('/:id', deletePlayer);


module.exports = router;
