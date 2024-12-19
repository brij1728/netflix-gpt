import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/user';

interface UserState {
  users: User[];
}

// Initial state
const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload; // Replace the user list
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload); // Add a single user
    },
    removeUser: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        // Remove specific user by `uid`
        state.users = state.users.filter((user) => user.uid !== action.payload);
      } else {
        // Clear all users if no `uid` is provided
        state.users = [];
      }
    },
  },
});

export const { setUser, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
