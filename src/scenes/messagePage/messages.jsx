import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Messages = () => {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const handleInputChange = (evt) => {
    setMessage(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await fetch(`https://bubble-backend-5ewq.vercel.app/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: _id, message }),
      });
      const data = await response.json();
      console.log(data);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch(`https://bubble-backend-5ewq.vercel.app/chat/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch initial messages when the component mounts
    getMessages();

    // Set up interval to fetch new messages every second
    const interval = setInterval(() => {
      getMessages();
    }, 1000);

    // Clean up interval when the component unmounts
    return () => {
      clearInterval(interval);
    }; // eslint-disable-next-line
  }, [chatId, token]);

  return (
    <Box display='flex' flexDirection='column' alignItems='center' marginTop='20%'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        {messages.map((message) => (
          <Box
            key={message._id}
            display='flex'
            justifyContent={message.userId === _id ? 'flex-end' : 'flex-start'}
            marginBottom='10px'
          >
            <Box
              padding='10px'
              borderRadius='10px'
              backgroundColor={message.userId === _id ? '#3f51b5' : '#e0e0e0'}
              color={message.userId === _id ? 'white' : 'black'}
            >
              {message.message}
            </Box>
          </Box>
        ))}
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          id="message-input"
          label="Message"
          variant="outlined"
          value={message}
          onChange={handleInputChange}
        />
        <Button type="submit">Send</Button>
      </form>
    </Box>
  );
};

export default Messages