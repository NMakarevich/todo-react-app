import './app.module.scss';

import styles from './app.module.scss';
import { AddIcon, Button, Portal } from '@shared/ui';
import { lazy, type ReactElement, useState } from 'react';
import { ModalContext, TodoContextProvider } from '@shared/context-api';

const TodoForm = lazy(() => import('../../features/TodoForm/ui/TodoForm.tsx'));
const TodoList = lazy(() => import('../../widgets/TodoList/ui/TodoList.tsx'));

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [component, setComponent] = useState<ReactElement | null>(null);

  function closeModal() {
    setIsOpenModal(false);
    setComponent(null);
  }

  function openModal() {
    setIsOpenModal(true);
    setComponent(<TodoForm mode={'Create'} />);
  }

  return (
    <TodoContextProvider>
      <ModalContext
        value={{
          setIsOpenModal,
          isOpenModal,
          component,
          setComponent,
          closeModal,
        }}
      >
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
              onClick={openModal}
            >
              Add todo
            </Button>
            <TodoList />
          </div>
        </main>
        {isOpenModal && <Portal />}
      </ModalContext>
    </TodoContextProvider>
  );
}

export default App;
