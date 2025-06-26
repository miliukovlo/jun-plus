import { Task } from '@/components';
import React from 'react';
import { ITasksListProps } from './TasksListTypes';

export const TasksList = ({ tasks }: ITasksListProps) => {
  return (
    <div className='flex flex-col gap-5'>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
          />
        );
      })}
    </div>
  );
};
