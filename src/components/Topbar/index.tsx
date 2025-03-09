import React from 'react';
import clsx from 'clsx';

import styles from './topbar.module.sass';

export const Topbar: React.FC = () => {
  return (
    <header className={styles.component}>
      <nav className={styles.nav}>
        <menu className={styles.icons}>
          <li>
            <button aria-label='Вид'>
              <img width={24} height={24} src='/icons/grid.svg' alt='Вид' />
            </button>
          </li>
          <li>
            <button aria-label='Поделиться'>
              <img
                width={24}
                height={24}
                src='/icons/share.svg'
                alt='Поделиться'
              />
            </button>
          </li>
        </menu>
        <menu className={styles.menu}>
          <li className={styles.menuItem}>
            <button className={clsx(styles.menuItemButton, styles.active)}>
              Просмотр
            </button>
          </li>
          <li className={styles.menuItem}>
            <button className={styles.menuItemButton}>Управление</button>
          </li>
        </menu>
      </nav>
    </header>
  );
};
