import React from 'react';

import styles from './hints.module.sass';

interface IHint {
  hotkey: string;
  description: string;
}

const HINT_LIST: IHint[] = [
  {
    hotkey: 'Escape',
    description: 'отменить изменения',
  },
  {
    hotkey: 'Enter',
    description: 'сохранить изменения',
  },
  {
    hotkey: 'Дв. клик по пустому месту',
    description: 'создать новую запись',
  },
  {
    hotkey: 'Дв. клик по записи',
    description: 'редактировать выбранную запись',
  },
];

export const Hints: React.FC = () => {
  return (
    <div className={styles.component}>
      <p className={styles.caption}>Подсказки</p>
      <ul className={styles.hintList}>
        {HINT_LIST.map((hint, index) => (
          <li className={styles.hintListItem} key={index}>
            <code className={styles.hintHotkey}>{hint.hotkey}</code> -{' '}
            <span className={styles.hintDescription}>{hint.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
