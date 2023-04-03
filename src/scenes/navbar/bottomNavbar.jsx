// import { useState } from "react";
import {
//   Box,
  IconButton,
//   InputBase,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
  useTheme,
//   useMediaQuery,
} from "@mui/material";
import {
  Search,
//   Message,
//   DarkMode,
//   LightMode,
//   Notifications,
//   Help,
//   Menu,
//   Close,
  HomeRepairService,
  Home,
  Person,
} from "@mui/icons-material";
// import { useDispatch} from "react-redux";
// import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom"
import FlexBetween from "components/FlexBetween"
import { useSelector } from 'react-redux'


const BottomNavbar = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector((state) => state.user);
    // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
    const theme = useTheme();
    // const neutralLight = theme.palette.neutral.light;
    // const dark = theme.palette.neutral.dark;
    // const background = theme.palette.background.default;
    // const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const { _id } = useSelector((state) => state.user)


    return (
        <FlexBetween zIndex='0' bottom='0' position='fixed' width='100%' padding="1.5rem 6%" backgroundColor={alt}>
            <IconButton onClick={() => navigate('/home')}>
                <Home sx={{fontSize: 25}}/>
            </IconButton>
            <IconButton onClick={() => navigate('/search')}>
                <Search sx={{fontSize: 25}}/>
            </IconButton>
            <IconButton onClick={() => navigate(`/profile/${_id}`)}>
                <Person sx={{fontSize: 25}}/>
            </IconButton>
            <IconButton>
              <HomeRepairService onClick={() => navigate('/settings')}/>
            </IconButton>
        </FlexBetween>

    )
}

export default BottomNavbar