import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './slide/counterSlide';
import userReducer from './slide/userSlide';
// import userReducer from '../features/UserSlice.spec';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});