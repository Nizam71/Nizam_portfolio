const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));
// Images and assets are now served automatically from public/assets via the line above

// Fallback for SPA or direct file requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
