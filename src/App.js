import { Navigate, Routes, Route } from 'react-router-dom';
import HomePage from './scenes/homePage/home'
import LoginPage from './scenes/loginPage/login'
import ProfilePage from './scenes/profilePage/profile'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import {ThemeProvider} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { themeSettings } from './theme';
import { createTheme } from '@mui/material/styles';

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path='/' element={isAuth ? <Navigate to='/home'/> : <LoginPage/>}/>
        <Route path='/home' element={isAuth ? <HomePage/> : <Navigate to='/'/>}/>
        <Route path='/profile/:userId' element={isAuth ? <ProfilePage/> : <Navigate to='/'/>}/>
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
