// Chatbot.js
import  { useState } from 'react';
import axios from 'axios';
import { ChatFeed, Message } from 'react-chat-ui-kit';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = 'user1'; // Example user ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = new Message({ id: 0, message: input });
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        userId,
        message: input,
      });

      const botMessage = new Message({ id: 1, message: response.data.reply });
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = new Message({ id: 1, message: 'Sorry, I am having trouble right now.' });
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <ChatFeed
        messages={messages}
        showSenderName
      />
      <div className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <style>{`
        .chatbot-container {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 500px;
        }
        .input-form {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ccc;
        }
        .input-form input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .input-form button {
          padding: 10px;
          margin-left: 10px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
