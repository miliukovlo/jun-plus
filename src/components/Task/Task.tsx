import { RootType } from '@/store';
import { removeTask, setEditId, startTask, stopTask } from '@/store/Slices/TasksSlice';
import { Button } from '@/UI-KIT';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITaskProps } from './TaskTypes';

export const Task = ({ task, openModal }: ITaskProps) => {
  const timeExcept = {
    hour: String(Math.floor(task.timeExcept / 60)).padStart(2, '0'),
    minutes: String(task.timeExcept % 60).padStart(2, '0'),
  };

  const spentTime = {
    hour: String(Math.floor(task.timeSpent / 60)).padStart(2, '0'),
    minutes: String(task.timeSpent % 60).padStart(2, '0'),
  };

  const isTaskExpired = task.timeExcept < task.timeSpent;

  const { activeTaskId } = useSelector((state: RootType) => state.tasks);
  const dispatch = useDispatch();

  const handleStart = () => {
    if (activeTaskId !== task.id) {
      dispatch(startTask(task.id));
    } else {
      dispatch(stopTask());
    }
  };

  const handleEdit = () => {
    dispatch(setEditId(task.id));
    openModal(true);
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };
  return (
    <div
      className={`flex w-full flex-col gap-5 rounded-[16px] border-2 border-blue-300 p-5 duration-300 ${isTaskExpired && 'border-red-500'}`}
    >
      <div className='flex w-full justify-between gap-5 rounded-[8px] bg-white p-3'>
        <div className='flex flex-col gap-3'>
          <h4>
            Задача: {task.title}{' '}
            {isTaskExpired && <span className='font-bold'> - просрочена</span>}
          </h4>
          <p>Описание: {task.description}</p>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-end'>
            Время на выполнение: {timeExcept.hour} : {timeExcept.minutes}
          </p>
          <p className='text-end'>
            Потраченно времени: {spentTime.hour} : {spentTime.minutes}{' '}
          </p>
        </div>
      </div>
      <div className='flex w-full items-end justify-between gap-2'>
        <Button
          type='button'
          text='Удалить задачу'
          className='!w-fit self-start'
          onClick={handleDelete}
        />
        <div className='flex gap-2'>
          <Button
            className='!w-fit'
            type='button'
            onClick={handleStart}
            text={activeTaskId === task.id ? 'Остановить выполнение' : 'Начать таймер'}
          />
          <Button
            className='!w-fit'
            onClick={handleEdit}
            type='button'
            text='Редактировать задачу'
          />
        </div>
      </div>
    </div>
  );
};
