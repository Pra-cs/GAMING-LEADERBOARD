import React, { useState } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

export default function LeaderboardView() {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState('');
  const [rank, setRank] = useState(null);

  const submitScore = async () => {
    try {
      await axios.post('http://localhost:5000/api/players/submit', { username, score });
      const res = await axios.get(`http://localhost:5000/api/players/${username}/rank`);
      setRank(res.data.rank);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎮 Gaming Leaderboard</h1>

      <input
        type="text"
        placeholder="Username"
        className="border p-2 m-1"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="number"
        placeholder="Score"
        className="border p-2 m-1"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded m-1"
        onClick={submitScore}
      >
        Submit Score
      </button>

      {rank && <p className="mt-2">🏆 Your Rank: {rank}</p>}

      <Leaderboard />
    </div>
  );
}
