import React from 'react';
import { IModalProps } from './ModalTypes';

export const Modal = ({ onClose, showModal, children }: IModalProps) => {
  if (showModal) {
    return (
      <div className='fixed top-0 left-0 flex size-full items-center justify-center'>
        <div
          onClick={onClose}
          className='absolute flex h-full w-full items-center justify-center bg-black/50 blur-xs'
        />
        {children}
      </div>
    );
  }
};
