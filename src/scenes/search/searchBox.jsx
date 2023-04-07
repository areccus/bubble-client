import React, {useEffect, useState} from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import UserImage from 'components/UserImage'
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const token = useSelector((state) => state.token)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      const response = await fetch(
        `https://bubble-backend-5ewq.vercel.app/users/search/${searchTerm}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`}
        }
      )
      const data = await response.json()
      setSearchResults(data)
      console.log(searchResults)
    }
    if (searchTerm.length > 0) {
      search()
    } else {
      setSearchResults([])
    }// eslint-disable-next-line
  }, [searchTerm, token])

  const handleInputChange = (evt) => {
    setSearchTerm(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
  }

  return (
    <Box sx={{ marginTop: '15%', width: '100%' }}>
    <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <TextField sx={{width: '70%'}} placeholder="Search" variant="outlined" value={searchTerm} onChange={handleInputChange}/>
    </form>

    <Box sx={{mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
   {searchResults.map((user) => (
        <Button key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
        <Box sx={{ mt: 2, border: '1px solid #ccc', width: '70vw', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserImage image={user.picturePath} size='100px' />
            <Typography fontSize='1.2rem' marginLeft='10%' variant="body1">{user.userName}</Typography>
        </Box>
        </Button>
      ))}
    </Box>
  </Box>

  )
}

export default SearchBox