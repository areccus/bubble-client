// import {useState} from 'react'
import {
    Box,
    Typography,
    Switch,
    // FormControl,
    useTheme
} from '@mui/material'
import {setMode, setLogout} from 'state'
import { useNavigate } from 'react-router-dom';
// import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux';

const Settings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {palette} = useTheme()
    // const neutralLight = theme.palette.neutral.light
    // const dark = theme.palette.neutral.dark
    const primaryMain = palette.primary.main
    // const alt = theme.palette.background.alt
    const handleChange = () => {
      dispatch(setMode());
    }

    const handleLogOut = () => {
      dispatch(setLogout())
      navigate('/')
    }

  return (
    <Box style={{marginTop: '20%',display: 'flex', flexDirection: 'Column', justifyContent: 'center', width: '100%', padding: '0 7%'}}>
      <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '2%', marginBottom: '2%', borderBottom: '1px solid #d4d9d6'}}>
        <Typography style={{fontWeight: 'bold', fontSize: '1rem'}}>
          Dark Mode
        </Typography>
        <Switch
        checked={palette.mode === "dark"}
        onChange={handleChange}
        color="primary"
        sx={{ fontSize: "25px" }}
        />
      </Box>
      <Box style={{paddingBottom: '2%', marginBottom: '2%', borderBottom: '1px solid #d4d9d6', display: 'flex', justifyContent: 'center'}}>
        <Typography 
        onClick={() => handleLogOut()}
        style={{fontSize: '1.4rem', fontWeight: 'bold', color: primaryMain}}>
          Sign Out
        </Typography>
      </Box>
    </Box>
  )
}

export default Settings