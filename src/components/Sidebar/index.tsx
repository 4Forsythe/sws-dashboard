import React from 'react';
import clsx from 'clsx';
import { SIDEBAR_ITEMS } from '@/mocks';

import styles from './sidebar.module.sass';

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.component}>
      <div className={styles.header}>
        <div className={styles.sortProperties}>
          <p className={styles.sortTitle}>Название проекта</p>
          <span className={styles.sortBy}>Аббревиатура</span>
        </div>
        <button aria-label='Открыть сортировку'>
          <img
            width={24}
            height={24}
            src='/icons/arrow-down.svg'
            alt='Сортировка'
          />
        </button>
      </div>

      <nav className={styles.navbar}>
        <ul className={styles.list}>
          {SIDEBAR_ITEMS.map((item, index) => (
            <li className={styles.listItem} key={index}>
              <button
                className={clsx(styles.listItemLink, {
                  [styles.active]: item.url === window.location.pathname,
                })}
              >
                <img
                  width={22}
                  height={22}
                  src='/icons/layout.svg'
                  alt={item.name}
                />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
