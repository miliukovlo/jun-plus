import { RootType } from '@/store';
import { updateTask } from '@/store/Slices/TasksSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTimer = () => {
  const dispatch = useDispatch();
  const { activeTaskId } = useSelector((state: RootType) => state.tasks);
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (activeTaskId) {
      interval = setInterval(() => {
        dispatch(updateTask());
      }, 60_000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeTaskId, dispatch]);
};
