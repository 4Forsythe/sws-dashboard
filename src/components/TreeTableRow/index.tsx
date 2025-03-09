import React from 'react';
import clsx from 'clsx';

import { useDeleteRow } from '@/hooks';
import { TreeTableRowButtons, TreeTableRowForm } from '@/components';
import { useAppDispatch } from '@/redux';
import { setIsEditing } from '@/redux/table/slice';

import type { IRecursiveRow } from '@/types';

import styles from './tree-table-row.module.sass';

interface Props {
  row: IRecursiveRow;
  nesting: number;
  isDisabled?: boolean;
}

export const TreeTableRow: React.FC<Props> = ({ row, nesting, isDisabled }) => {
  const [isShowNestedForm, setIsShowNestedForm] = React.useState(false);

  const dispatch = useAppDispatch();
  const { mutation: deleteRow } = useDeleteRow();

  const onShowNestedForm = () => {
    if (!isDisabled) {
      setIsShowNestedForm(true);
    }
  };

  const onDismissNestedForm = () => {
    setIsShowNestedForm(false);
  };

  const setEditForm = () => {
    if (!isDisabled) {
      dispatch(setIsEditing({ id: row.id, isEditing: true }));
    }
  };

  const onDeleteRow = async () => {
    await deleteRow(row.id);
  };

  if (row.isEditing) {
    return <TreeTableRowForm row={row} nesting={nesting} />;
  }

  return (
    <React.Fragment>
      <tr
        className={clsx(styles.component, { [styles.disabled]: isDisabled })}
        onDoubleClick={setEditForm}
      >
        <td className={styles.tableBodyColumn}>
          {!isDisabled && (
            <TreeTableRowButtons
              row={row}
              nesting={nesting}
              onCreateRow={onShowNestedForm}
              onDeleteRow={onDeleteRow}
            />
          )}
        </td>
        <td className={styles.tableBodyColumn}>{row.rowName}</td>

        <React.Fragment>
          <td className={styles.tableBodyColumn}>{row.salary}</td>
          <td className={styles.tableBodyColumn}>{row.equipmentCosts}</td>
          <td className={styles.tableBodyColumn}>{row.overheads}</td>
          <td className={styles.tableBodyColumn}>{row.estimatedProfit}</td>
        </React.Fragment>
      </tr>

      {row.child.length > 0 &&
        row.child.map((child) => (
          <TreeTableRow
            key={child.id}
            row={child}
            nesting={nesting + 1}
            isDisabled={row.isEditing}
          />
        ))}

      {isShowNestedForm && (
        <TreeTableRowForm
          nesting={nesting + 1}
          parentId={row.id}
          onDismiss={onDismissNestedForm}
        />
      )}
    </React.Fragment>
  );
};
