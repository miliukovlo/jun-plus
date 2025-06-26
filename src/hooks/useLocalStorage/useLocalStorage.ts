'use client';

import { setTasks } from '@/store/Slices/TasksSlice';
import { ITask } from '@/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useLocalStorage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      const parse: ITask[] = JSON.parse(saved);
      dispatch(setTasks(parse));
    }
  }, []);
};
