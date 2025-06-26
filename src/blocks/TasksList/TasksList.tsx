import { Task } from '@/components';
import React from 'react';
import { ITasksListProps } from './TasksListTypes';

export const TasksList = ({ tasks, openModal }: ITasksListProps) => {
  return (
    <div className='mb-5 flex flex-col gap-5'>
      {tasks.map((task) => {
        return (
          <Task
            openModal={openModal}
            key={task.id}
            task={task}
          />
        );
      })}
    </div>
  );
};
