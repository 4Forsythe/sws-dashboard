import React from 'react';
import clsx from 'clsx';

import type { IRecursiveRow } from '@/types';

import styles from './tree-table-row-buttons.module.sass';

interface Props {
  row: IRecursiveRow;
  nesting: number;
  onCreateRow: () => void;
  onDeleteRow: () => Promise<void>;
}

export const TreeTableRowButtons: React.FC<Props> = ({
  row,
  nesting,
  onCreateRow,
  onDeleteRow,
}) => {
  const [isPopup, setIsPopup] = React.useState(false);

  const handlePopup = (value: boolean) => {
    if (!row.isEditing) {
      setIsPopup(value);
    }
  };

  return (
    <div
      className={clsx(styles.component, { [styles.showed]: isPopup })}
      style={{ marginLeft: `${nesting * 20}px` }}
      onMouseEnter={() => handlePopup(true)}
      onMouseLeave={() => handlePopup(false)}
    >
      <button className={styles.mainButton} onClick={onCreateRow}>
        {nesting > 0 && <div className={styles.verticalLine} />}
        {nesting > 0 && <div className={styles.horizontalLine} />}

        <img
          className={styles.icon}
          width={24}
          height={24}
          src='/icons/file.svg'
          alt='Создать'
        />
      </button>
      <button className={styles.popupButton} onClick={onDeleteRow}>
        <img
          className={styles.icon}
          width={16}
          height={16}
          src='/icons/trash.svg'
          alt='Удалить'
        />
      </button>
    </div>
  );
};
