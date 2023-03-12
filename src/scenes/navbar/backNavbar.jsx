import {
    IconButton,
    useTheme,
  } from "@mui/material";
  import {
    Message,
    Notifications,
    ArrowBack
  } from "@mui/icons-material";
  // import { useSelector } from "react-redux";
  // import { setMode, setLogout } from "state";
  import { useNavigate } from "react-router-dom";
  import FlexBetween from "components/FlexBetween";
  
  const BackNavbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    // const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
  
    return (
      <FlexBetween zIndex='1' position='fixed' width='100%' top='0' padding="1rem 6%" backgroundColor={alt}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack/>
          </IconButton>
          <FlexBetween> 
          </FlexBetween>
      </FlexBetween>
    );
  };
  
  export default BackNavbar;
  