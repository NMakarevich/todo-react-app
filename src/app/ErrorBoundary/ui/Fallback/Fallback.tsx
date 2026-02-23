import type { FallbackProps } from '@app/ErrorBoundary/ui/types.ts';

import styles from './fallback.module.scss';
import { memo } from 'react';
import { Button } from '@shared/ui';

const Fallback = ({ message }: FallbackProps) => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.fallback}>
      <div className={styles.container}>
        <span className={styles.fallbackMessage}>{message}</span>
        <Button className={styles.reload} type={'button'} onClick={reload}>
          Reload
        </Button>
      </div>
    </div>
  );
};

export default memo(Fallback);
