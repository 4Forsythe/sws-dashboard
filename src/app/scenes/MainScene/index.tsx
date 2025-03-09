import React from 'react';
import { Sidebar, Topbar } from '@/components';

import styles from './main-scene.module.sass';

interface Props {
  children: React.ReactNode;
}

export const MainScene: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Topbar />
      <div className={styles.inner}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};
