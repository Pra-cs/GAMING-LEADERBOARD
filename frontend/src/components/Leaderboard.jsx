import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/players/leaderboard');
        setPlayers(res.data);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000); // Auto-refresh every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">🏆 Top Players</h2>
        <table className="w-full border border-black text-center">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800 font-semibold">
              <th className="border border-black px-4 py-2 text-center">Rank</th>
              <th className="border border-black px-4 py-2 text-center">Name</th>
              <th className="border border-black px-4 py-2 text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {players.slice(0, 10).map((player, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="border border-black px-4 py-2 text-center align-middle">{index + 1}</td>
                <td className="border border-black px-4 py-2 text-center align-middle">{player.username}</td>
                <td className="border border-black px-4 py-2 text-center align-middle">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
