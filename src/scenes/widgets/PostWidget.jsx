// Importing necessary dependencies from the MUI and React libraries
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing reusable components from the 'components' folder
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

// Importing the 'setPost' action from the Redux store
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments
}) => {
  // Initializing the 'isComments' state variable with a default value of 'false'
  const [isComments, setIsComments] = useState(false);

  // Creating dispatch and selector hooks to interact with the Redux store
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  // Determining whether the current user has liked the post or not
  const isLiked = Boolean(likes[loggedInUserId]);

  // Counting the total number of likes on the post
  const likeCount = Object.keys(likes).length;

  // Getting the MUI theme object for later use
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // Function that sends a PATCH request to the server to add or remove a like from the current user
  const patchLike = async () => {
    const response = await fetch(`https://bubble-backend-5ewq.vercel.app/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    // Parsing the updated post object from the server response and updating the Redux store
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    // Wrapping the entire post widget in a reusable 'WidgetWrapper' component
    <WidgetWrapper m="2rem 0">
      {/* Displaying the name, location, and user avatar of the post author */}
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {/* Displaying the post description text */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* Displaying the post image, if available */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://bubble-backend-5ewq.vercel.app/assets/${picturePath}`}
        />
      )}

      {/* Displaying the like, comment, and share buttons with their respective counts */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Displaying the like button and its count */}
          <FlexBetween gap="0.3rem">
            {/* If the current user has already liked the post, display the filled-in heart icon in the primary color*/}
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                // If the current user has not yet liked the post, display the empty heart icon
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* Displaying the comment button and its count */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* Displaying the share button */}
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* Displaying the comment section, if the 'isComments' state is set to true */}
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              {/* Displaying each comment with a divider and proper indentation */}
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;