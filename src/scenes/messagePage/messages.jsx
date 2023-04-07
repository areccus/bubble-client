import React, { useState, useEffect, useRef } from 'react'
import { Box, TextField, Button, useTheme, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'

const Messages = () => {
  const { chatId } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const { palette } = useTheme()
  // const primaryMain = palette.primary.main
  const [numMessages, setNumMessages] = useState(0) // New state variable to keep track of number of messages
  const token = useSelector((state) => state.token)
  const { _id } = useSelector((state) => state.user)
  const location = useLocation()
  const params = new URLSearchParams(location.search);
  const chatroom = JSON.parse(params.get('chatroom'));

  console.log(chatroom)

  const messagesEndRef = useRef(null)

  const handleInputChange = (evt) => {
    setMessage(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
       await fetch(`https://bubble-backend-5ewq.vercel.app/chat/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: _id, message }),
      });
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
      setNumMessages(data.length); // Update number of messages
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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages.length])

  const chatName = chatroom.members.find((member) => member.userId !== _id)?.userName

  return (
    <Box display='flex' flexDirection='column' alignItems='center' height='100vh' width='100vw'>
      <Button style={{position: 'absolute', zIndex: '1', right: '8vw', top: '2vh'}}>
      <Typography style={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold'}}>{chatName}</Typography>
      </Button>
      <Box display='flex' flexDirection='column' alignItems='center' height='100%' width='100%' overflow='auto' padding='12vh 3vh 3vw'>
        {messages.map((message) => (
          <Box 
            width='100%'
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
        <div ref={messagesEndRef} />
      </Box>
  <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '3.5vh'}}>
    <TextField
      style={{width: '70vw', backgroundColor: palette.background.alt}}
      variant="outlined"
      placeholder='Type a message here...'
      value={message}
      onChange={handleInputChange}
    />
    <Button style={{fontSize: '1rem', marginLeft: '3%'}} type="submit">Send</Button>
  </form>
</Box>
  );
};

export default Messages