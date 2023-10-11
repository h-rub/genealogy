import { createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpointsCodes } from './endpointCodes';

const initialState = {
    eventsLog : []
}

const eventsLogSlice = createSlice({
    initialState,
    name: 'eventsLog',
    extraReducers: (builder) => {
    },
    reducers: {
        setEventsLog: (state, action) => {
          state.eventsLog = action.payload;
        },
        addEvent: (state, action) => {
            state.eventsLog = state.eventsLog.concat(action.payload);
          }
      },
});

export const {
    setEventsLog,
    addEvent
  } = eventsLogSlice.actions;
  

export const selectEventsLog = (state) => state.eventsLog.eventsLog;

export default eventsLogSlice.reducer;