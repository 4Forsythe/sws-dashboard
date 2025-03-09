import React from 'react';

import { toast } from 'sonner';
import { isFetchBaseQueryError } from '@/lib';

import { useGetRowsQuery } from '@/redux/table/api';
import {
  setTable,
  setIsLoading,
  setIsError,
  setError,
} from '@/redux/table/slice';
import { useAppDispatch, useAppSelector } from '@/redux';

export function useTable() {
  const dispatch = useAppDispatch();
  const table = useAppSelector((state) => state.table);

  const isMounted = React.useRef(false);

  const {
    data: rows,
    error,
    isLoading,
    isError,
    isSuccess,
  } = useGetRowsQuery(undefined, { skip: table.items && isMounted.current });

  React.useEffect(() => {
    if (!isMounted.current) {
      dispatch(setIsLoading(true));
    }
  }, []);

  React.useEffect(() => {
    if (isError) {
      dispatch(setIsError(true));
      toast.error('Ошибка при получении записей');

      if (isFetchBaseQueryError(error)) {
        console.error(error);
        dispatch(setError(error.data as string));
      }
    }

    if (isSuccess && rows) {
      dispatch(setTable(rows));
      dispatch(setIsLoading(false));

      isMounted.current = true;
    }
  }, [isMounted, isSuccess, isError, rows]);

  return { data: table.items, error, isLoading, isError, isSuccess };
}
