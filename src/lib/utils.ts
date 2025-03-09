import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { IRow, IRecursiveRow, IRowsResponse } from '@/types';

export const findRowById = (
  items: IRowsResponse,
  id: number
): IRecursiveRow | undefined => {
  for (const item of items) {
    if (item.id === id) return item;

    if (item.child) {
      for (const child of item.child) {
        const found = findRowById([child], id);
        if (found) return found;
      }
    }
  }
};

export const findRowAndUpdate = (
  items: IRowsResponse,
  current: IRow
): IRowsResponse => {
  return items.map((item) => {
    if (item.id === current.id) {
      return {
        ...item,
        ...current,
        isEditing:
          current.isEditing !== undefined ? current.isEditing : item.isEditing,
      };
    }

    return {
      ...item,
      child: findRowAndUpdate(item.child, current),
    };
  });
};

export const findRowAndDelete = (
  items: IRowsResponse,
  id: number
): IRowsResponse => {
  return items
    .filter((item) => item.id !== id)
    .map((item) => ({
      ...item,
      child: findRowAndDelete(item.child, id),
    }));
};

export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};
