import { RootType } from '@/store';
import { startTask, stopTask } from '@/store/Slices/TasksSlice';
import { Button } from '@/UI-KIT';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITaskProps } from './TaskTypes';

export const Task = ({ task }: ITaskProps) => {
  const timeExcept = {
    hour: String(Math.floor(task.timeExcept / 60)).padStart(2, '0'),
    minutes: String(task.timeExcept % 60).padStart(2, '0'),
  };

  const spentTime = {
    hour: String(Math.floor(task.timeSpent / 60)).padStart(2, '0'),
    minutes: String(task.timeSpent % 60).padStart(2, '0'),
  };

  const { activeTaskId } = useSelector((state: RootType) => state.tasks);
  const dispatch = useDispatch();
  const handleStart = () => {
    if (activeTaskId !== task.id) {
      dispatch(startTask(task.id));
    } else {
      dispatch(stopTask());
    }
  };
  return (
    <div className='flex w-full flex-col gap-5 rounded-[16px] border-2 border-blue-300 p-5'>
      <div className='flex w-full justify-between gap-5 rounded-[8px] bg-white p-3'>
        <div className='flex flex-col gap-3'>
          <h4>Название: {task.title}</h4>
          <p>Описание: {task.description}</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p>
            Время на выполнение: {timeExcept.hour} :{timeExcept.minutes}
          </p>
          <p>
            Потраченно времени: {spentTime.hour} : {spentTime.minutes}{' '}
          </p>
        </div>
      </div>
      <div className='flex w-full items-end justify-between gap-2'>
        <Button
          type='button'
          text='Удалить задачу'
          className='!w-fit self-start'
        />
        <div className='flex gap-2'>
          <Button
            className='!w-fit'
            type='button'
            onClick={handleStart}
            text={activeTaskId === task.id ? 'Начать выполнение' : 'Остановить таймер'}
          />
          <Button
            className='!w-fit'
            type='button'
            text='Редактировать задачу'
          />
        </div>
      </div>
    </div>
  );
};
