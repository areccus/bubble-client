/* eslint-disable react-hooks/rules-of-hooks */
// import { useState } from "react";
import {
  // Box,
  IconButton,
  // InputBase,
  Typography,
  // Select,
  // MenuItem,
  // FormControl,
  useTheme,
  // useMediaQuery,
} from "@mui/material";
import {
  // Search,
  Message,
  // DarkMode,
  // LightMode,
  Notifications,
  // Help,
  // Menu,
  // Close,
} from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const TopNavbar = () => {
  // const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  // const neutralLight = theme.palette.neutral.light;
  // const dark = theme.palette.neutral.dark;
  // const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // const fullName = `${user.firstName} ${user.lastName}`;
  // const userName = `${user.userName}`

  return (
    <FlexBetween zIndex='1' position='fixed' width='100%' top='0' padding="1rem 6%" backgroundColor={alt}>
      <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 1.5rem, 2rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Bubble
        </Typography>
        <FlexBetween>
        <IconButton>
          <Notifications sx={{fontSize: 25}}/>
        </IconButton>
        <IconButton 
        style={{ marginLeft: '10%'}}
        onClick={() => navigate('/messages')}>
            <Message sx={{fontSize: 25}}/>
        </IconButton>
        </FlexBetween>
    </FlexBetween>
  );
};

export default TopNavbar;
