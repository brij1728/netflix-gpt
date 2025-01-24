import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/user';

interface UserState {
  users: User[];
  currentUser: User | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    removeUser: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        // Remove a specific user by `uid`
        state.users = state.users.filter((user) => user.uid !== action.payload);
        if (state.currentUser?.uid === action.payload) {
          state.currentUser = null; // Clear `currentUser` if it matches the removed user
        }
      } else {
        // Clear all users
        state.users = [];
        state.currentUser = null;
      }
    },
  },
});

export const { setUsers, addUser, setCurrentUser, removeUser } =
  userSlice.actions;
export default userSlice.reducer;
