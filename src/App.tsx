import './app.module.scss';
import { TodoList } from './widgets';

import styles from './app.module.scss';
import { Portal } from '@shared/ui';
import { type ReactElement, useState } from 'react';
import { ModalContext, TodoContextProvider } from '@shared/context-api';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [component, setComponent] = useState<ReactElement | null>(null);

  function closeModal() {
    setIsOpenModal(false);
    setComponent(null);
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
            <TodoList />
          </div>
        </main>
        {isOpenModal && <Portal />}
      </ModalContext>
    </TodoContextProvider>
  );
}

export default App;
