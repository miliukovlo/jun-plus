import React from 'react';
import { ISearchProps } from './SearchTypes';

export const Search = ({ value, setValue }: ISearchProps) => {
  return (
    <div className='w-full items-center justify-center'>
      <input
        className='w-full rounded-[4px] border-2 border-blue-300 p-5 indent-[5px] outline-0'
        value={value}
        placeholder='Найти задачу'
        onChange={(e) => setValue(e.target.value)}
        type='text'
      />
    </div>
  );
};
