import { Box, useMediaQuery} from '@mui/material'
import { useEffect, useState }from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BottomNavbar from 'scenes/navbar/bottomNavbar'
import TopNavbar from 'scenes/navbar/topNavbar'
import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import UserWidget from 'scenes/widgets/UserWidget'

const ProfilePage = () => {
    const [user, setUser] = useState()
    const { userId } = useParams()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

    const getUser = async () => {
        const response = await fetch(`https://bubble-backend-5ewq.vercel.app/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}`}
        })
        const data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser() // eslint-disable-next-line
    }, []) 

    if (!user) return null
    return (
        <Box>
            <TopNavbar/>
            <Box
            width='100%'
            padding='2rem 6%'
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap='2rem'
            justifyContent='space-between'
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath}/>
                </Box>
                <Box flexBasis={isNonMobileScreens ? '42%' : undefined}
                mt={isNonMobileScreens ? undefined : '2rem'}>
                    {userId === _id ? <MyPostWidget picturePath={user.picturePath}/> : undefined}
                    <Box  m='2rem 0 '/>
                    <PostsWidget userId={userId} isProfile/>
                </Box>
            </Box>
            <BottomNavbar/>
        </Box>
    )
}

export default ProfilePage