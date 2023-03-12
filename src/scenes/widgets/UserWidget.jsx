import {
    ManageAccountsOutlined,
    LocationOnOutlined,
  } from '@mui/icons-material';
  import { Box, Typography, useTheme } from '@mui/material';
  import UserImage from 'components/UserImage';
  import FlexBetween from 'components/FlexBetween';
  import WidgetWrapper from 'components/WidgetWrapper';
  import { useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  
  const UserWidget = ({ userId, picturePath }) => {
    // Set up state variables and constants
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const { _id } = useSelector((state) => state.user);
  
    // Fetch the user's data from the backend API
    const getUser = async () => {
      const response = await fetch(
        `https://bubble-backend-5ewq.vercel.app/users/${userId}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setUser(data);
    };
  
    // Call getUser() when the component mounts
    useEffect(() => {
      getUser(); // eslint-disable-next-line
    }, []);
  
    // If user data hasn't been fetched yet, return null
    if (!user) {
      return null;
    }
  
    // Extract user data from the response
    const {
      userName,
      // firstName,
      // lastName,
      location,
      occupation,
      // viewedProfile,
      // impressions,
      friends,
    } = user;
  
    // Render the user widget
    return (
      <WidgetWrapper style={{ marginTop: '20%' }}>
        <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} size="60px" />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  '&:hover': {
                    color: palette.primary.light,
                    cursor: 'pointer',
                  },
                }}
              >
                {userName}
              </Typography>
              <Typography color={medium}>{friends.length} friends</Typography>
            </Box>
          </FlexBetween>
          {userId === _id ? <ManageAccountsOutlined /> : undefined}
        </FlexBetween>
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{location}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{occupation}</Typography>
          </Box>
        </Box>
      </WidgetWrapper>
    );
  };
  
  export default UserWidget;