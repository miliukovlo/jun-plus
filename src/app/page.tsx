'use client';
import { Header, Modal, TasksList } from '@/blocks';
import { useLocalStorage } from '@/hooks';
import { RootType } from '@/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  useLocalStorage();
  const [showModal, setShowModal] = useState<boolean>(false);
  const tasks = useSelector((state: RootType) => state.tasks);
  return (
    <main className='flex h-full w-full items-center justify-center'>
      <section className='container flex flex-col gap-[80px]'>
        <Header openModal={() => setShowModal(true)} />
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
        />
        <TasksList tasks={tasks.list} />
      </section>
    </main>
  );
}
