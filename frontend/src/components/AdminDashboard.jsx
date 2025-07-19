import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    const res = await axios.get('http://localhost:5000/api/players/all');
    setPlayers(res.data);
  };

  const updateScore = async (id, newScore) => {
    await axios.put(`http://localhost:5000/api/players/${id}`, { score: newScore });
    fetchPlayers();
  };

  const deletePlayer = async (id) => {
    await axios.delete(`http://localhost:5000/api/players/${id}`);
    fetchPlayers();
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛠 Admin Dashboard</h1>
      <table className="w-full border border-black text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-black p-2">Username</th>
            <th className="border border-black p-2">Score</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player._id}>
              <td className="border border-black p-2">{player.username}</td>
              <td className="border border-black p-2">
                <input
                  type="number"
                  value={player.score}
                  onChange={(e) => updateScore(player._id, e.target.value)}
                  className="border px-2 w-24 text-center"
                />
              </td>
              <td className="border border-black p-2">
                <button onClick={() => deletePlayer(player._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
