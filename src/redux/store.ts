import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { persistReducer, persistStore } from 'redux-persist';

import configReducer from './slices/configSlice';
import { configureStore } from '@reduxjs/toolkit';
import gptReducer from './slices/gptSlice';
import moviesReducer from './slices/moviesSlice';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const appStore = configureStore({
  reducer: {
    user: persistedReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(appStore);
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
