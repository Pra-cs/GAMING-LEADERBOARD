require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/players', playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
