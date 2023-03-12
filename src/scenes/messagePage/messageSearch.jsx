import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, TextField, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import UserImage from 'components/UserImage';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';

const MessageSearch = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const search = async () => {
      const response = await fetch(`https://bubble-backend-5ewq.vercel.app/users/search/${searchTerm}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSearchResults(data);
    };
    if (searchTerm.length > 0) {
      search();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, token]);

  const handleInputChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  const generateRandomString = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleSelectUser = async (user) => {
    try {
      const members = [_id, user._id];
      const chatId = generateRandomString(10); // Generate a random 10-character string for the chatId
      
      const response = await fetch(`https://bubble-backend-5ewq.vercel.app/chat/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ members })
      });
  
      const newChat = await response.json();
      navigate(`/messages/${newChat._id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ marginTop: '10%', width: '100%' }}>
      <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          inputRef={inputRef}
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleInputChange}
          sx={{ width: '70%', background: '#FFFFFF', padding: '1.5%' }}
          InputProps={{
            endAdornment:
              searchTerm.length > 0 && (
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              ),
          }}
        />
      </form>

      <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {searchResults.map((user) => (
          <Button key={user._id} onClick={() => handleSelectUser(user)}>
            <Box sx={{ mt: 2, background: '#FFFFFF', border: '1px solid #ccc', width: '70vw', height: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserImage image={user.picturePath} size="60px" />
              <Typography color="black" fontSize="1.2rem" marginLeft="10%" variant="body1">
                {user.userName}
              </Typography>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default MessageSearch;