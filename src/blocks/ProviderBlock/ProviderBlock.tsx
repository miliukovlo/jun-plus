'use client';
import { store } from '@/store';
import React from 'react';
import { Provider } from 'react-redux';
import { IProviderBlockProps } from './ProviderBlockTypes';

export const ProviderBlock = ({ children }: IProviderBlockProps) => {
  return <Provider store={store}>{children}</Provider>;
};
