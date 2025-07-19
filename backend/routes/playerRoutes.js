const express = require('express');
const router = express.Router();
const {
  submitScore,
  getLeaderboard,
  getPlayerRank
} = require('../controllers/playerController');

router.post('/submit', submitScore);
router.get('/leaderboard', getLeaderboard);
router.get('/:username/rank', getPlayerRank);

module.exports = router;
