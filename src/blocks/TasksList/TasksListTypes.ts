import { ITask } from '@/types';
import { Dispatch, SetStateAction } from 'react';

export interface ITasksListProps {
  tasks: ITask[];
  openModal: Dispatch<SetStateAction<boolean>>;
}
