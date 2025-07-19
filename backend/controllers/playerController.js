const Player = require('../models/Player');

// Submit or update player score
const submitScore = async (req, res) => {
  try {
    const { username, score } = req.body;

    if (!username || score == null) {
      return res.status(400).json({ error: 'Username and score are required' });
    }

    let player = await Player.findOne({ username });

    if (!player) {
      player = await Player.create({ username, score, lastUpdated: new Date() });
    } else {
      if (score > player.score) {
        player.score = score;
        player.lastUpdated = new Date();
        await player.save();
      }
    }

    res.status(200).json(player);
  } catch (error) {
    console.error('Error in submitScore:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get top 10 players
const getLeaderboard = async (req, res) => {
  try {
    const topPlayers = await Player.find()
      .sort({ score: -1, lastUpdated: 1 })
      .limit(10);
    
    res.status(200).json(topPlayers);
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get rank of a specific player
const getPlayerRank = async (req, res) => {
  try {
    const { username } = req.params;

    const player = await Player.findOne({ username });
    if (!player) return res.status(404).json({ error: 'Player not found' });

    const rank = await Player.countDocuments({
      $or: [
        { score: { $gt: player.score } },
        { score: player.score, lastUpdated: { $lt: player.lastUpdated } }
      ]
    }) + 1;

    res.status(200).json({ username, rank });
  } catch (error) {
    console.error('Error in getPlayerRank:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Get all players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ score: -1 });
    res.status(200).json(players);
  } catch (error) {
    console.error('Error in getAllPlayers:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Update player score
const updatePlayerScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    const player = await Player.findByIdAndUpdate(id, { score }, { new: true });
    if (!player) return res.status(404).json({ error: 'Player not found' });

    res.status(200).json(player);
  } catch (error) {
    console.error('Error in updatePlayerScore:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Delete player
const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Player.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Player not found' });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error in deletePlayer:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  submitScore,
  getLeaderboard,
  getPlayerRank,
  getAllPlayers,
  updatePlayerScore,
  deletePlayer
};
