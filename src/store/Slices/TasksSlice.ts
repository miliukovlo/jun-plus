import { ITasksList } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState: ITasksList = {
  list: [],
  activeTaskId: null,
  editTaskId: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { hours, minutes, title, description } = action.payload;
      state.list.push({
        id: uuidv4(),
        timeExcept: hours * 3600 + minutes * 60,
        timeSpent: 0,
        title: title,
        description: description,
      });
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    removeTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
      state.activeTaskId = null;
      localStorage.setItem('tasks', JSON.stringify(state.list));
    },
    setEditId: (state, action) => {
      state.editTaskId = action.payload;
    },
    editTask: (state, action) => {
      const { id, title, description, hours, minutes } = action.payload;
      const task = state.list.find((elem) => elem.id === id);
      if (task) {
        task.description = description;
        task.title = title;
        task.timeExcept = hours * 3600 + minutes * 60;
      }
      state.editTaskId = null;
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
      state.activeTaskId = action.payload;
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

export const {
  addTask,
  removeTask,
  updateTask,
  startTask,
  stopTask,
  setTasks,
  editTask,
  setEditId,
} = tasksSlice.actions;
