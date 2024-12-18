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
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUser, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
