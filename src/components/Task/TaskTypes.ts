import { ITask } from '@/types';
import { Dispatch, SetStateAction } from 'react';

export interface ITaskProps {
  task: ITask;
  openModal: Dispatch<SetStateAction<boolean>>;
}
