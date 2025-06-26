'use client';
import { addTask } from '@/store/Slices/TasksSlice';
import { Button } from '@/UI-KIT';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IFormProps, IFormState } from '../FormTypes';

export const DefaultForm = ({ onModalClose }: IFormProps) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<IFormState>({
    title: '',
    description: '',
    hours: 0,
    minutes: 0,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formState.title !== '' &&
      formState.description !== '' &&
      (formState.hours !== 0 || formState.minutes !== 0)
    ) {
      dispatch(
        addTask({
          hours: formState.hours,
          minutes: formState.minutes,
          title: formState.title,
          description: formState.description,
        }),
      );
      onModalClose();
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
      </fieldset>
      <Button
        type='submit'
        text='Создать задачу'
      />
    </form>
  );
};
