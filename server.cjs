// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = './tasks.txt';

// Get tasks
app.get('/tasks', (req, res) => {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    const tasks = JSON.parse(data || '[]');
    res.json(tasks);
  } else {
    res.json([]);
  }
});

// Save tasks
app.post('/tasks', (req, res) => {
  const tasks = req.body;
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
  res.json({ success: true });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
