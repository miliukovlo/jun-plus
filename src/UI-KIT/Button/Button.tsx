import React from 'react';
import { IButtonProps } from './ButtonTypes';

export const Button = ({ text, onClick, type, className }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`hover:text-milkyWhite w-full cursor-pointer rounded-[8px] border-2 border-black p-4 duration-150 hover:bg-black ${className}`}
      type={type}
    >
      {text}
    </button>
  );
};
