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
      className={`flex w-full flex-col gap-5 rounded-[16px] border-2 border-blue-300 p-5 duration-300 ${isTaskExpired && '!border-red-500'} ${task.id === activeTaskId && 'border-green-300'}`}
    >
      <div className='flex flex-col lg:flex-row w-full justify-between gap-5 rounded-[8px] bg-white p-3'>
        <div className='flex lg:max-w-3/5 overflow-hidden flex-col gap-3'>
          <h4>
            <span className='font-bold'>Задача:</span> {task.title}
            {isTaskExpired && <span className='font-bold'> - просрочена</span>}
          </h4>
          <span className='flex flex-col'>
            <span className='font-bold'>Описание:</span>
            <AnimateHeight
              height={showDescription || task.description.length <= 80 ? 'auto' : 20}
              disableDisplayNone
            >
              <p className='max-w-full'>{task.description}</p>
            </AnimateHeight>
            {task.description.length > 100 && (
              <button
                className='w-fit cursor-pointer border-b-1 border-transparent pb-1 text-left font-bold duration-150 hover:border-black'
                onClick={() => setShowDescription(!showDescription)}
              >
                {showDescription ? 'Скрыть описание' : 'Открыть описание'}
              </button>
            )}
          </span>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='lg:text-end'>
            <span className='font-bold'>Время на выполнение:</span> {timeExcept.hour} : {timeExcept.minutes} : {timeExcept.seconds}
          </p>
          <p className='lg:text-end'>
            <span className='font-bold'>Потраченно времени:</span> {spentTime.hour} : {spentTime.minutes} : {spentTime.seconds}
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
