import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the auth slice of the Redux store
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Define the auth slice of the Redux store and its reducers
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Toggle between light and dark mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Set the user and token upon logging in
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Clear the user and token upon logging out
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Set the user's friends
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Set the posts in the Redux store
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Update a single post in the Redux store
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Export the auth slice's reducers as actions
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Export the auth slice reducer as the default export
export default authSlice.reducer;