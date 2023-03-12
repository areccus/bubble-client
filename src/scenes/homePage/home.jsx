import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"

import MyPostWidget from 'scenes/widgets/MyPostWidget'
import PostsWidget from "scenes/widgets/PostsWidget"

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
    const { _id, picturePath } = useSelector((state) => state.user)
    return (
        <Box>
            <Box
            width='100%'
            padding='0'
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap='0.5rem'
            justifyContent='center'
            >
                <Box flexBasis={isNonMobileScreens ? '42%' : undefined}
                mt={isNonMobileScreens ? undefined : '0'}>
                    <MyPostWidget picturePath={picturePath}/>
                    <PostsWidget userId={_id}/>
                </Box>
                {isNonMobileScreens && <Box flexBasis='26%'></Box>}
            </Box>
        </Box>
    )
}

export default HomePage