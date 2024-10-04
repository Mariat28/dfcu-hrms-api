const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/Routes');
const validateHeaders = require('./middleware/auth');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(validateHeaders);

//routes
app.use('/api', routes); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    res.status(500).json({ error: 'An unexpected error occurred.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
