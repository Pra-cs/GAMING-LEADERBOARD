const Player = require('../models/Player');

exports.submitScore = async (req, res) => {
  const { username, score } = req.body;
  if (!username || score == null) return res.status(400).json({ error: 'Missing data' });

  let player = await Player.findOne({ username });

  if (!player) {
    player = await Player.create({ username, score });
  } else {
    if (score > player.score) {
      player.score = score;
      player.lastUpdated = new Date();
      await player.save();
    }
  }

  res.status(200).json(player);
};

exports.getLeaderboard = async (req, res) => {
  const topPlayers = await Player.find().sort({ score: -1, lastUpdated: 1 }).limit(10);
  res.json(topPlayers);
};

exports.getPlayerRank = async (req, res) => {
  const { username } = req.params;
  const player = await Player.findOne({ username });

  if (!player) return res.status(404).json({ error: 'Player not found' });

  const rank = await Player.countDocuments({
    $or: [
      { score: { $gt: player.score } },
      { score: player.score, lastUpdated: { $lt: player.lastUpdated } }
    ]
  }) + 1;

  res.json({ username, rank });
};
