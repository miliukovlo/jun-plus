import React from 'react';
import { Form } from '../Form/Form';
import { IModalProps } from './ModalTypes';

export const Modal = ({ onClose, showModal }: IModalProps) => {
  if (showModal) {
    return (
      <div className='absolute top-0 left-0 flex size-full items-center justify-center'>
        <div
          onClick={onClose}
          className='absolute flex h-full w-full items-center justify-center bg-black/50 blur-xs'
        />
        <Form onModalClose={onClose} />
      </div>
    );
  }
};
