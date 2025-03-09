import React from 'react';

import { toast } from 'sonner';
import { isFetchBaseQueryError } from '@/lib';

import { useCreateRowMutation } from '@/redux/table/api';
import {
  createRow,
  setIsLoading,
  setIsError,
  setError,
} from '@/redux/table/slice';
import { useAppDispatch } from '@/redux';

import type { ICreateRowForm } from '@/types';

export function useCreateRow() {
  const dispatch = useAppDispatch();
  const parentId = React.useRef<number | null>(null);

  const [mutation, { data, error, isLoading, isError, isSuccess }] =
    useCreateRowMutation();

  const handleCreateRow = React.useCallback(
    async (data: ICreateRowForm) => {
      dispatch(setIsLoading(true));
      try {
        await mutation(data).unwrap();
        parentId.current = data.parentId;
      } catch (error) {
        dispatch(setIsError(true));
        toast.error('Ошибка при создании записи');

        if (isFetchBaseQueryError(error)) {
          console.error('[useCreateRow]:', error);
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
      dispatch(createRow({ parentId: parentId.current, response: data }));
    }
  }, [isSuccess, dispatch]);

  return { mutation: handleCreateRow, error, isLoading, isError, isSuccess };
}
