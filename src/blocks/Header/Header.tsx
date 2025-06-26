import { Button } from '@/UI-KIT';
import React from 'react';
import { IHeaderProps } from './HeaderTypes';

export const Header = ({ openModal }: IHeaderProps) => {
  return (
    <header className='sticky top-0 w-full rounded-br-[8px] rounded-bl-[8px] bg-black/80 p-5'>
      <div className='container flex w-full items-center justify-between'>
        <h1 className='text-[24px] text-white'>TimeTracker</h1>
        <Button
          type='button'
          text='Создать задачу'
          onClick={openModal}
          className='hover:bg-milkyWhite !w-fit bg-white hover:!text-black'
        />
      </div>
    </header>
  );
};
