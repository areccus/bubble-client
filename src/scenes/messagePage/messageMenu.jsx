import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';
import UserImage from 'components/UserImage'
import MessageSearch from './messageSearch';

const Chats = () => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme()
  const token = useSelector((state) => state.token);
  const [chatrooms, setChatrooms] = useState([]);

  const getChats = async () => {
    try {
      const response = await fetch(`https://bubble-backend-5ewq.vercel.app/chat/chats/user/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setChatrooms(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    // Fetch initial messages when the component mounts
    getChats();

    // Set up interval to fetch new messages every second
    const interval = setInterval(() => {
      getChats();
    }, 1000);

    // Clean up interval when the component unmounts
    return () => {
      clearInterval(interval);
    }; // eslint-disable-next-line
  }, [_id, token])

  const getLastMessage = (messages) => {
    if (messages.length === 0) {
      return '';
    }
    const lastMessage = messages[messages.length - 1];
    return `${lastMessage.userName}: ${lastMessage.message}`;
  }
  console.log(chatrooms)
  return (
    <Box style={{paddingTop: '10%'}}>
      <MessageSearch />
      <Box>
        {chatrooms.map((room) => {
          const chatName = room.members.find((member) => member.userId !== _id)?.userName
          const userPicturePath = room.members.find(member => member.userId !== _id)?.userPicturePath;
          const lastMessage = getLastMessage(room.messages);
          return (
            <Button sx={{padding: '2%', width: '100%', textAlign: 'left'}} key={room._id} onClick={() => navigate({
              pathname: `/messages/${room._id}`,
              search: `?chatroom=${JSON.stringify(room)}`,
            })}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center'}}>
              <UserImage image={userPicturePath} size="70px" />
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%', alignItems: 'flex-start'}}>
                  <Typography fontSize="1.2rem"  variant="body1">
                    {chatName}
                  </Typography>
                <Typography color={palette.neutral.main} fontSize="0.7rem" variant="body1">
                  {lastMessage}
                </Typography>
                </Box>
              </Box>
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default Chats;