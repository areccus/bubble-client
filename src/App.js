import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import HomePage from './scenes/homePage/home';
import LoginPage from './scenes/loginPage/login';
import MessageMenu from './scenes/messagePage/messageMenu';
import Messages from 'scenes/messagePage/messages';
import ProfilePage from './scenes/profilePage/profile';
import SearchPage from 'scenes/search/searchPage';
import TopNavbar from 'scenes/navbar/topNavbar';
import BottomNavbar from 'scenes/navbar/bottomNavbar';
import { themeSettings } from './theme';
import BackNavbar from 'scenes/navbar/backNavbar';

function App() {
  const location = useLocation();

  // Get the current theme mode from Redux store
  const mode = useSelector((state) => state.mode);

  // Create a new MUI theme based on the current theme mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Check if the user is authenticated
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      {/* Set the viewport for mobile devices */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

      {/* Use the MUI theme provider to set the global theme */}
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Show the top navbar if the current path is not the home or messages page */}
        {location.pathname === '/' || location.pathname === '/messages' ? undefined : <TopNavbar />}
        {location.pathname === '/messages' || location.pathname.startsWith('/messages/') ?  <BackNavbar/> : <TopNavbar/>}
        
        {/* Define the app routes */}
        <Routes>
          <Route path="/" element={isAuth ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="/messages" element={isAuth ? <MessageMenu /> : <Navigate to="/" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/messages/:chatId" element={isAuth ? <Messages /> : <Navigate to="/" />} />
        </Routes>

        {/* Show the bottom navbar if the current path is not the home or messages page */}
        {location.pathname !== '/' && location.pathname !== '/messages' && !location.pathname.startsWith('/messages/') ? <BottomNavbar /> : undefined}
      </ThemeProvider>
    </div>
  );
}

export default App;