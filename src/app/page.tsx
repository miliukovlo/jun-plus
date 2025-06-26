'use client';
import { Form, Header, Modal, Search, TasksList } from '@/blocks';
import { useLocalStorage, useTimer } from '@/hooks';
import { RootType } from '@/store';
import { ITask } from '@/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  useLocalStorage();
  useTimer();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const tasks = useSelector((state: RootType) => state.tasks);
  const [currentTasks, setCurrentTasks] = useState<ITask[]>(tasks.list);

  useEffect(() => {
    setCurrentTasks(
      tasks.list.filter(
        (element) =>
          element.description.includes(searchValue) ||
          element.title.includes(searchValue),
      ),
    );
  }, [searchValue, tasks]);

  return (
    <main className='flex h-full w-full items-center justify-center'>
      <section className='container flex flex-col gap-[80px]'>
        <Header openModal={() => setShowModal(true)} />
        <Search
          value={searchValue}
          setValue={setSearchValue}
        />
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        >
          <Form.default onModalClose={() => setShowModal(false)} />
        </Modal>

        <Modal
          showModal={showEditModal}
          onClose={() => setShowEditModal(false)}
        >
          <Form.edit onModalClose={() => setShowEditModal(false)} />
        </Modal>
        <TasksList
          tasks={currentTasks}
          openModal={setShowEditModal}
        />
      </section>
    </main>
  );
}
