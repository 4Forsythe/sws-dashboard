import React from 'react';

import styles from './table-loader.module.sass';

export const TableLoader: React.FC = () => {
  return (
    <div className={styles.component}>
      <div className={styles.overlay} />
      <p className={styles.text}>Пожалуйста, подождите...</p>
    </div>
  );
};
