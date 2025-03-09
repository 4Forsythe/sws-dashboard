import React from 'react';

import { useTable } from '@/hooks';
import { useAppSelector } from '@/redux';
import { TreeTable } from '@/components';

import styles from './dashboard.module.sass';

export const Dashboard: React.FC = () => {
  const { data: rows } = useTable();
  const { isLoading } = useAppSelector((state) => state.table);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.tab}>
          <h1 className={styles.tabTitle}>Строительно-монтажные работы</h1>
        </div>
      </header>
      <section className={styles.section}>
        <TreeTable items={rows || []} isLoading={isLoading} />
      </section>
    </div>
  );
};
