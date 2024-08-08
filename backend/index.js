// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;
const GEN_AI_API_KEY = process.env.GEN_AI_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEN_AI_API_KEY);

// Middleware
app.use(express.json());
app.use(cors());

// Route to handle chat requests
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Select the appropriate generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate content based on the provided prompt
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.json({ completion: text });
    } catch (error) {
        console.error('Error from Gen AI API:', error.message);
        res.status(500).json({ error: 'Error communicating with Gen AI API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
