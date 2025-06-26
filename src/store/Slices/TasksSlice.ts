import { ITasksList } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: ITasksList = {
  list: [],
  activeTaskId: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { hours, minutes, title, description } = action.payload;
      state.list.push({
        id: uuidv4(),
        timeExcept: hours * 60 + minutes,
        timeSpent: 0,
        title: title,
        description: description,
      });
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    removeTask: (state, action) => {
      const { id } = action.payload;
      state.list = state.list.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    updateTask: (state) => {
      const task = state.list.find((task) => task.id === state.activeTaskId);
      if (task) {
        task.timeSpent += 1;
      }
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    startTask: (state, action) => {
      const { id } = action.payload;
      state.activeTaskId = id;
    },
    stopTask: (state) => {
      state.activeTaskId = null;
    },
    setTasks: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const tasksReducer = tasksSlice.reducer;

export const { addTask, removeTask, updateTask, startTask, stopTask, setTasks } =
  tasksSlice.actions;
