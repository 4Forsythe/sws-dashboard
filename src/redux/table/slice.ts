import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { findRowAndUpdate, findRowAndDelete, findRowById } from '@/lib';

import type { IRowResponse, IRowsResponse } from '@/types';

export interface ITableState {
  items: IRowsResponse;
  error: string | null;
  isError: boolean;
  isLoading: boolean;
}

const initialState = {
  items: [],
  error: null,
  isError: false,
  isLoading: true,
} satisfies ITableState as ITableState;

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<IRowsResponse>) => {
      state.items = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setIsEditing: (
      state,
      action: PayloadAction<{ id: number; isEditing: boolean }>
    ) => {
      const { id, isEditing } = action.payload;
      const data = findRowById(state.items, id);

      if (data) {
        const items = findRowAndUpdate(state.items, {
          ...data,
          isEditing,
        });

        state.items = items;
      }
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    createRow: (
      state,
      action: PayloadAction<{ parentId: number | null; response: IRowResponse }>
    ) => {
      const { parentId, response } = action.payload;
      const { current } = response;

      const data = { child: [], ...current };

      console.log('Created Item:', data);

      if (parentId !== null && parentId !== undefined) {
        const parent = findRowById(state.items, parentId);

        if (parent) {
          parent.child.push(data);
        } else {
          state.items.push(data);
        }
      } else {
        state.items.push(data);
      }
    },
    updateRow: (state, action: PayloadAction<IRowResponse>) => {
      const { current, changed } = action.payload;

      console.log('Updated Item:', findRowAndUpdate(state.items, current));

      state.items = findRowAndUpdate(state.items, current);

      changed.map(
        (item) => (state.items = findRowAndUpdate(state.items, item))
      );
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      console.log('Deleted Item:', findRowAndDelete(state.items, id));

      state.items = findRowAndDelete(state.items, id);
    },
  },
});

export const {
  setTable,
  setError,
  setIsEditing,
  setIsLoading,
  setIsError,
  createRow,
  updateRow,
  deleteRow,
} = tableSlice.actions;

export default tableSlice.reducer;
