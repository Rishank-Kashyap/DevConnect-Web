import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    users: [],
    selectedUser: null,
  },
  reducers: {
    addFeed: (state, action) => {
      state.users = action.payload;
    },
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { addFeed, removeUserFromFeed, setSelectedUser } = feedSlice.actions;
export default feedSlice.reducer;