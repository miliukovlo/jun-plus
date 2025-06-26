'use client';
import { validate } from '@/hooks';
import { RootType } from '@/store';
import { editTask } from '@/store/Slices/TasksSlice';
import { Button } from '@/UI-KIT';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IFormErrors, IFormProps, IFormState } from '../FormTypes';

export const EditForm = ({ onModalClose }: IFormProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootType) => state.tasks);
  const currentTask = tasks.list.find((elem) => elem.id === tasks.editTaskId);
  if (!currentTask) {
    onModalClose();
  }
  const [errors, setError] = useState<IFormErrors>({
    titleError: null,
    descriptionError: null,
    minuteError: null,
  });
  const [formState, setFormState] = useState<IFormState>({
    title: currentTask ? currentTask.title : '',
    description: currentTask ? currentTask.description : '',
    hours: currentTask ? Math.floor(currentTask.timeExcept / 60) : 0,
    minutes: currentTask ? Math.floor(currentTask.timeExcept % 60) : 0,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate.title(formState.title).status === 'fail') {
      setError({ ...errors, titleError: validate.title(formState.title) });
      return;
    } else {
      setError({ ...errors, titleError: null });
    }
    if (validate.description(formState.description).status === 'fail') {
      setError({
        ...errors,
        descriptionError: validate.description(formState.description),
      });
      return;
    } else {
      setError({ ...errors, descriptionError: null });
    }
    if (validate.minute(formState.minutes).status === 'fail') {
      setError({ ...errors, minuteError: validate.minute(formState.minutes) });
      return;
    } else {
      setError({ ...errors, minuteError: null });
    }
    if (
      formState.hours !== 0 ||
      (formState.minutes !== 0 && validate.minute(formState.minutes))
    ) {
      dispatch(
        editTask({
          id: tasks.editTaskId,
          hours: formState.hours,
          minutes: formState.minutes,
          title: formState.title,
          description: formState.description,
        }),
      );
      onModalClose();
    } else {
      setError({ ...errors, minuteError: { status: 'fail', message: 'Укажите время!' } });
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onClick={(e) => e.stopPropagation()}
      className='bg-milkyWhite relative flex flex-col gap-4 rounded-[12px] p-6'
    >
      <button
        onClick={onModalClose}
        type='button'
        className='absolute top-3 right-3 cursor-pointer duration-150 hover:rotate-90'
      >
        <div className='group relative flex items-center justify-center'>
          <div className='absolute h-3 w-1 rotate-45 bg-black duration-300 group-hover:bg-black/70' />
          <div className='absolute h-3 w-1 -rotate-45 bg-black duration-300 group-hover:bg-black/70' />
        </div>
      </button>
      <fieldset className='flex flex-col gap-2'>
        <label htmlFor='form_title'>Название</label>
        <input
          className='w-[300px] rounded-[8px] border-2 border-black indent-[5px] outline-0'
          value={formState.title}
          id={'form_title'}
          placeholder='Введите название задачи'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormState({ ...formState, title: e.target.value })
          }
          type='text'
        />
        <p
          className={`text-red-700 opacity-0 duration-150 ${errors.titleError?.status === 'fail' && 'opacity-100'}`}
        >
          Ошибка: {errors.titleError?.message}
        </p>
      </fieldset>
      <fieldset className='flex flex-col gap-2'>
        <label htmlFor='form_description'>Описание</label>
        <textarea
          className='w-[300px] resize-none rounded-[12px] border-2 border-black indent-[5px] outline-0'
          value={formState.description}
          id={'form_description'}
          placeholder='Введите описание задачи'
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormState({ ...formState, description: e.target.value })
          }
        />
        <p
          className={`text-red-700 opacity-0 duration-150 ${errors.titleError?.status === 'fail' && 'opacity-100'}`}
        >
          Ошибка: {errors.titleError?.message}
        </p>
      </fieldset>
      <fieldset className='flex flex-col gap-2'>
        <label htmlFor='form_hours'>Часы</label>
        <input
          className='w-[300px] rounded-[8px] border-2 border-black indent-[5px] outline-0'
          value={formState.hours}
          id='form_hours'
          placeholder='Введите количество часов'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormState({ ...formState, hours: Number(e.target.value) })
          }
          type='number'
        />
      </fieldset>
      <fieldset className='flex flex-col gap-2'>
        <label htmlFor='form_minutes'>Минут</label>
        <input
          className='w-[300px] rounded-[8px] border-2 border-black indent-[5px] outline-0'
          value={formState.minutes}
          id='form_minutes'
          min={0}
          max={59}
          placeholder='Введите количество минут'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormState({ ...formState, minutes: Number(e.target.value) })
          }
          type='number'
        />
        <p
          className={`text-red-700 opacity-0 duration-150 ${errors.minuteError?.status === 'fail' && 'opacity-100'}`}
        >
          Ошибка: {errors.minuteError?.message}
        </p>
      </fieldset>
      <Button
        type='submit'
        text='Редактировать задачу'
      />
    </form>
  );
};
