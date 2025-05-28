// src/store/reducers/eventsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MyEvent } from '../../types/events';

interface EventsState {
  events: MyEvent[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<MyEvent>) {
      state.events.push(action.payload);
    },
    clearEvents(state) {
      state.events = [];
    },
  },
});

export const { addEvent, clearEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
