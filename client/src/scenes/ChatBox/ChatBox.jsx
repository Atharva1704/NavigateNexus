import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '32rem',
          height: '32rem',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" gutterBottom>
          ChatBox
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          {messages.map((msg, index) => (
            <Typography key={index}>{msg}</Typography>
          ))}
        </Box>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleMessageSend}>
          Send
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatBox;
