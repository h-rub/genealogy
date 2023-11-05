import { createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpointsCodes } from './endpointCodes';

import { selectEventsLog, addEvent } from './eventsLogSlice';
import { notifyError } from '../../partials/paletization/Toasts';


const initialState = {
    openOrdersList: [],
    loading: false,
  };

export const revertAll = createAction('REVERT_ALL');
export const revertSearch = createAction('REVERT_SEARCH');
const openOrdersSlice = createSlice({
    initialState,
    name: 'openOrders',
    extraReducers: (builder) => {
      builder.addCase(revertAll, () => initialState);
      builder.addCase(revertSearch, (state, action) => {
        state.search = [];
      });
    },
    reducers: {
      setOpenOrdersList: (state, action) => {
        state.openOrdersList = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setNotFound: (state, action) => {
        state.notFound = action.payload;
      },
    },
  });

  export const {
    setOpenOrdersList,
    setLoading,
    setNotFound
  } = openOrdersSlice.actions;

export const selectOpenOrdersList = (state) => state.openOrders.openOrdersList;
export const selectLoading = (state) => state.openOrders.loading;

export default openOrdersSlice.reducer;

export const getOpenOrdersList = () => (dispatch) => {
    //dispatch(setLoading(true));
    // const startFetchOrders = {
    //   text: 'Obteniendo órdenes desde SAP',
    //   timestamp: new Date().toISOString(),
    // };
    // dispatch(addEvent(startFetchOrders));
    axios
      .get('http://em10vs0010.embraco.com:8001/api/v1/orders')
      .then((response) => {
        if (response.status === 200) {
          //dispatch(setLoading(false));
          console.log(response.data);
          dispatch(setOpenOrdersList(response.data));
        } else {
          notifyError("Ocurrió un error al obtener los órdenes desde SAP.")
        }
      })
      .catch((error) => {
        notifyError("Ocurrió un error al obtener los órdenes desde SAP.")
        endpointsCodes(error, dispatch, setNotFound)});
  };
  