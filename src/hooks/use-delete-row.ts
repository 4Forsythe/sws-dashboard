import React from 'react';

import { toast } from 'sonner';
import { isFetchBaseQueryError } from '@/lib';

import { useDeleteRowMutation } from '@/redux/table/api';
import {
  deleteRow,
  setIsLoading,
  setIsError,
  setError,
} from '@/redux/table/slice';
import { useAppDispatch } from '@/redux';

export function useDeleteRow() {
  const dispatch = useAppDispatch();
  const deletedRowId = React.useRef<number | null>(null);

  const [mutation, { error, isLoading, isError, isSuccess }] =
    useDeleteRowMutation();

  const handleDeleteRow = React.useCallback(
    async (id: number) => {
      dispatch(setIsLoading(true));
      try {
        await mutation(id).unwrap();
        deletedRowId.current = id;
      } catch (error) {
        dispatch(setIsError(true));
        toast.error('Ошибка при удалении записи');

        if (isFetchBaseQueryError(error)) {
          console.error('[useDeleteRow]:', error);
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
      deletedRowId.current && dispatch(deleteRow(deletedRowId.current));
    }
  }, [isSuccess, dispatch]);

  return { mutation: handleDeleteRow, error, isLoading, isError, isSuccess };
}
