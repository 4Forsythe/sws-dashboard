import React from 'react';

import { toast } from 'sonner';
import { isFetchBaseQueryError } from '@/lib';

import { useUpdateRowMutation } from '@/redux/table/api';
import {
  updateRow,
  setIsLoading,
  setIsError,
  setError,
} from '@/redux/table/slice';
import { useAppDispatch } from '@/redux';

import type { IUpdateRowForm } from '@/types';

interface IHandleUpdateRow {
  id: number;
  body: IUpdateRowForm;
}

export function useUpdateRow() {
  const dispatch = useAppDispatch();
  const credentials = React.useRef<{ id: number; body: IUpdateRowForm } | null>(
    null
  );

  const [mutation, { data, error, isLoading, isError, isSuccess }] =
    useUpdateRowMutation();

  const handleUpdateRow = React.useCallback(
    async ({ id, body }: IHandleUpdateRow) => {
      dispatch(setIsLoading(true));
      try {
        await mutation({ id, ...body }).unwrap();
        credentials.current = { id, body };
      } catch (error) {
        dispatch(setIsError(true));
        toast.error('Ошибка при обновлении записи');

        if (isFetchBaseQueryError(error)) {
          console.error('[useUpdateRow]:', error);
          dispatch(setError(error.data as string));
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, mutation]
  );

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(updateRow(data));
    }
  }, [isSuccess, dispatch]);

  return { mutation: handleUpdateRow, error, isLoading, isError, isSuccess };
}
