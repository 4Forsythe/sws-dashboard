import React from 'react';
import type { IRowsResponse } from '@/types';

import {
  Hints,
  TableLoader,
  TreeTableRow,
  TreeTableRowForm,
} from '@/components';

import styles from './tree-table.module.sass';

const COLUMNS: string[] = [
  'Уровень',
  'Наименование работ',
  'Основная з/п',
  'Оборудование',
  'Накладные расходы',
  'Сметная прибыль',
];

interface Props {
  items: IRowsResponse;
  isLoading?: boolean;
}

export const TreeTable: React.FC<Props> = ({ items, isLoading }) => {
  const [isShowRowForm, setIsShowRowForm] = React.useState(false);

  const onDismissRowForm = () => {
    setIsShowRowForm(false);
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLTableElement>) => {
    const target = event.target as HTMLElement;

    if (target.tagName === 'TABLE' || target.tagName === 'TBODY') {
      setIsShowRowForm(true);
    }
  };

  React.useEffect(() => {
    if (!isLoading && !(items.length > 0)) {
      setIsShowRowForm(true);
    }
  }, [items, isLoading]);

  return (
    <>
      {isLoading && <TableLoader />}

      <div className={styles.container}>
        <table className={styles.component} onDoubleClick={handleClickOutside}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableHeadColumns}>
              {COLUMNS.map((column, index) => (
                <th className={styles.tableHeadColumn} key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <TreeTableRow key={item.id} row={item} nesting={0} />
            ))}

            {isShowRowForm && (
              <TreeTableRowForm nesting={0} onDismiss={onDismissRowForm} />
            )}
          </tbody>
        </table>

        <div className={styles.footer}>
          <Hints />
        </div>
      </div>
    </>
  );
};
