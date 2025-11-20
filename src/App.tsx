import './app.module.scss';
import { TodoList } from './widgets';
import { TodoListMocked } from './mock.ts';

import styles from './app.module.scss';
import { Button } from './shared/ui';
import { AddIcon } from './shared/ui';
import { Portal } from './shared/ui/portal/Portal.tsx';
import { TodoForm } from './features/todo-form/TodoForm.tsx';
import { useState } from 'react';
import { ModalProvider } from './shared/context-api';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function openModal() {
    setIsOpenModal(true);
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  return (
    <ModalProvider isOpenModal={isOpenModal} openModal={openModal} closeModal={closeModal}>
      <header>
        <div className={styles.container}>
          <h1 className={styles.title}>Todo List</h1>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Button
            className={styles.addButton}
            type={'button'}
            icon={AddIcon()}
            onClick={() => setIsOpenModal(true)}
          >
            Add todo
          </Button>
          <TodoList list={TodoListMocked} />
        </div>
      </main>
      {isOpenModal && (
        <Portal>
          <TodoForm mode={'Create'} />
        </Portal>
      )}
    </ModalProvider>
  );
}

export default App;
