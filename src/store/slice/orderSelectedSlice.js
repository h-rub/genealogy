import { createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpointsCodes } from './endpointCodes';

const initialState = {
    orderSelected : {}
}

const orderSelectedSlice = createSlice({
    initialState,
    name: 'orderSelected',
    extraReducers: (builder) => {
    },
    reducers: {
      setOrderSelected: (state, action) => {
        state.orderSelected = action.payload;
      }
    },
  });

export const {
  setOrderSelected
} = orderSelectedSlice.actions;

export const selectOrderSelected = (state) => state.orderSelected.orderSelected;

export default orderSelectedSlice.reducer;