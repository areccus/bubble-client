import { Box } from '@mui/material'
import React from 'react'
import SearchBox from './searchBox'

const SearchPage = () => {
  return (
    <Box display='flex' position='absolute' top='10%' width='100%' height='100%'>
    <SearchBox/>
    </Box>
  )
}

export default SearchPage