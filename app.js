require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');


const app = express();


// Configuration
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || 'public';


// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true }));


// Serve static files from ./public by default
app.use(express.static(path.join(__dirname, STATIC_DIR)));


// Basic routes
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, STATIC_DIR, 'index.html'));
});


// Health check
app.get('/health', (req, res) => {
res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Example API endpoints
app.get('/api/hello', (req, res) => {
res.json({ message: 'Hello from Node server!', query: req.query });
});


app.post('/api/echo', (req, res) => {
// Echoes JSON back to the client
res.json({ received: req.body });
});


// 404 handler
app.use((req, res, next) => {
res.status(404).json({ error: 'Not found' });
});


// Error handler
app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});