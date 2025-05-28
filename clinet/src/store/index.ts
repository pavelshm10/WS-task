import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './reducers/eventsSlice';
import connectionRducer from './reducers/connectionSlice';
import { useDispatch, useSelector, useStore, type TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    connection: connectionRducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;

// ✅ Custom typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();
