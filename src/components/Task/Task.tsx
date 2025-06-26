'use client';
import { useFormatTime } from '@/hooks';
import { RootType } from '@/store';
import { removeTask, setEditId, startTask, stopTask } from '@/store/Slices/TasksSlice';
import { Button } from '@/UI-KIT';
import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { ITaskProps } from './TaskTypes';

export const Task = ({ task, openModal }: ITaskProps) => {
  const timeExcept = useFormatTime(task.timeExcept);

  const spentTime = useFormatTime(task.timeSpent);

  const [showDescription, setShowDescription] = useState<boolean>(false);

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
        <div className='flex flex-col max-w-3/5 gap-3'>
          <h4>
            <span className='font-bold'>Задача:</span> {task.title}{' '}
            {isTaskExpired && <span className='font-bold'> - просрочена</span>}
          </h4>
          <span className='flex flex-col'>
            <span className='font-bold'>Описание:</span>
            <AnimateHeight
              height={showDescription || task.description.length <= 80 ? 'auto' : 20}
              disableDisplayNone
            >
              {task.description}{' '}
            </AnimateHeight>
            {task.description.length > 100 && (
              <button className='text-left border-b-1 border-transparent duration-150 pb-1 font-bold w-fit cursor-pointer hover:border-black' onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? 'Скрыть описание' : 'Открыть описание'}
              </button>
            )}
          </span>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='text-end'>
            Время на выполнение: {timeExcept.hour} : {timeExcept.minutes}
          </p>
          <p className='text-end'>
            Потраченно времени: {spentTime.hour} : {spentTime.minutes}
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
