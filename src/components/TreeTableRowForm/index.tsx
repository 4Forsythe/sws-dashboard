import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/redux';
import { setIsEditing } from '@/redux/table/slice';

import { TextField, TreeTableRow } from '@/components';
import { useCreateRow, useUpdateRow } from '@/hooks';
import { rowSchema, type RowFormType } from '@/schemas';

import type { IRecursiveRow } from '@/types';

import styles from './tree-table-row-form.module.sass';

interface Props {
  row?: IRecursiveRow;
  nesting: number;
  parentId?: number;
  onDismiss?: () => void;
}

export const TreeTableRowForm: React.FC<Props> = ({
  row,
  nesting,
  parentId,
  onDismiss,
}) => {
  const dispatch = useAppDispatch();
  const { mutation: createRow } = useCreateRow();
  const { mutation: updateRow } = useUpdateRow();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<RowFormType>({
    resolver: zodResolver(rowSchema),
    defaultValues: row
      ? { ...row }
      : {
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          rowName: 'Новая запись',
          salary: 0,
          supportCosts: 0,
          parentId,
        },
  });

  console.log(errors);

  const onSubmit = async (data: RowFormType) => {
    if (row) {
      await updateRow({ id: row.id, body: data });
      dispatch(setIsEditing({ id: row.id, isEditing: false }));
    } else {
      await createRow({ parentId: parentId ?? null, ...data });
    }
    onDismiss && onDismiss();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const confirmReset = window.confirm(
        'Вы точно хотите отменить все изменения?'
      );
      if (confirmReset) {
        row
          ? dispatch(setIsEditing({ id: row.id, isEditing: false }))
          : onDismiss && onDismiss();
      }
    }

    if (event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  React.useEffect(() => {
    setFocus('rowName');
  }, [setFocus]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [row, dispatch]);

  return (
    <React.Fragment>
      <tr className={styles.component}>
        <td className={styles.tableBodyColumn}></td>
        <td className={styles.tableBodyColumn}>
          <TextField
            type='text'
            {...register('rowName')}
            error={errors.rowName}
          />
        </td>

        <React.Fragment>
          <td className={styles.tableBodyColumn}>
            <TextField
              type='number'
              {...register('salary')}
              error={errors.salary}
            />
          </td>
          <td className={styles.tableBodyColumn}>
            <TextField
              type='number'
              {...register('equipmentCosts')}
              error={errors.equipmentCosts}
            />
          </td>
          <td className={styles.tableBodyColumn}>
            <TextField
              type='number'
              {...register('overheads')}
              error={errors.overheads}
            />
          </td>
          <td className={styles.tableBodyColumn}>
            <TextField
              type='number'
              {...register('estimatedProfit')}
              error={errors.estimatedProfit}
            />
          </td>
        </React.Fragment>
      </tr>

      {row &&
        row.child.length > 0 &&
        row.child
          .filter((child) => child !== null)
          .map((child) => (
            <TreeTableRow
              key={child.id}
              row={child}
              nesting={nesting + 1}
              isDisabled={row.isEditing}
            />
          ))}
    </React.Fragment>
  );
};
