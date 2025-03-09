import { configureStore } from '@reduxjs/toolkit';

import table from './table/slice';
import { tableApi } from './table/api';

export const store = configureStore({
  reducer: {
    table,
    [tableApi.reducerPath]: tableApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tableApi.middleware),
});

// setupListeners(store.dispatch);

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
