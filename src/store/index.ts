import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './Slices/TasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
