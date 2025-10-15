const express = require('express');
const cors = require('cors');
require('dotenv').config();
const initializeDatabase = require('./config/initDB');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
