import './app.module.scss';
import { TodoList } from './widgets';
import { TodoListMocked } from './mock.ts';

import styles from './app.module.scss';

function App() {
  return (
    <>
      <header>
        <div className={styles.container}>
          <h1 className={styles.title}>Todo List</h1>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <TodoList list={TodoListMocked} />
        </div>
      </main>
    </>
  );
}

export default App;
