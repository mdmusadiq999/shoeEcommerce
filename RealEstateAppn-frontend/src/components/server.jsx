// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Load OpenAI API key from environment variable
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// In-memory storage for user sessions (for demonstration purposes)
const userSessions = {};

app.post('/api/chat', async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: 'User ID and message are required' });
  }

  try {
    // Initialize or update user session
    if (!userSessions[userId]) {
      userSessions[userId] = { messages: [] };
    }
    userSessions[userId].messages.push({ role: 'user', content: message });

    // Request response from OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: userSessions[userId].messages,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const chatbotResponse = response.data.choices[0].message.content.trim();

    // Update user session with the chatbot response
    userSessions[userId].messages.push({ role: 'assistant', content: chatbotResponse });

    res.json({ reply: chatbotResponse });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to get a response from the chatbot' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
