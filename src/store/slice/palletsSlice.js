import { createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpointsCodes } from './endpointCodes';
import { notifyProductMounted, notifyProductUnmounted } from '../../partials/paletization/Toasts';

const initialState = {
    pallet: {},
    components : []
}

const palletsSlice = createSlice({
    initialState,
    name: 'pallets',
    extraReducers: (builder) => {
    },
    reducers: {
        setPallet: (state, action) => {
          state.pallet = action.payload;
        },
        setComponents: (state, action) => {
          state.components = action.payload;
        },
        setNotFound: (state, action) => {
            state.notFound = action.payload;
          },

        unmountComponent: (state, action) => {
            const component = action.payload;
            state.components = state.components.filter((component) => component.id !== component.id);
           
        },
      },
});

export const {
    setPallet,
    setComponents,
    unmountComponent,
  } = palletsSlice.actions;
  

export const selectPallet = (state) => state.pallets.pallet;

export const selectComponents = (state) => state.pallets.components;

export default palletsSlice.reducer;

export const createPallet = (barcode, quantity) => (dispatch) => {
    //dispatch(setLoading(true));
    // const startFetchOrders = {
    //   text: 'Obteniendo órdenes desde SAP',
    //   timestamp: new Date().toISOString(),
    // };
    // dispatch(addEvent(startFetchOrders));
    const palletData = {
        identifier: barcode,
        quantity: quantity
    }
    axios
      .post('http://em10vs0010.embraco.com:8002/api/v1/paletization/pallets/', palletData)
      .then((response) => {
        if (response.status === 201) {
          //dispatch(setLoading(false));
          console.log("Pallet creado con éxito:", response.data);
          //dispatch(setTestResults(response.data.results));
          //console.log(response.data.global_status);
          //dispatch(setGlobalStatus(response.data.global_status));
          dispatch(setPallet(response.data));
        } else if (response.status === 200){
        console.log("Se encontró registro de Pallet:", response.data);
        dispatch(setPallet(response.data));
        const palletIdentifier = response.data.identifier;
        console.log(palletIdentifier);
        dispatch(getAllComponents(palletIdentifier))
        }
      })
      .catch((error) => endpointsCodes(error, dispatch, setNotFound));
  };

  export const getAllComponents = (palletIdentifier) => (dispatch) => {
    //dispatch(setLoading(true));
    // const startFetchOrders = {
    //   text: 'Obteniendo órdenes desde SAP',
    //   timestamp: new Date().toISOString(),
    // };
    // dispatch(addEvent(startFetchOrders));
    axios
     .get(`http://em10vs0010.embraco.com:8002/api/v1/paletization/pallets/${palletIdentifier}/components/`)
     .then((response) => {
        if (response.status === 200) {
          //dispatch(setLoading(false));
          console.log(response.data);
          dispatch(setComponents(response.data));
          //console.log(response.data.global_status);
          //dispatch(setGlobalStatus(response.data.global_status));
        }
      })
     .catch((error) => endpointsCodes(error, dispatch, setNotFound));
  }

  export const mountComponent = (palletID, serial, condenserMaterial, compressorMaterial) => (dispatch) => {
    const data = {
            pallet_id: palletID,
            condenser_unit_serial: serial,
            condenser_material_code: condenserMaterial,
            compressor_unit_serial: serial,
            compressor_material_code: compressorMaterial,
            material_type: "-"
    }
    axios
      .post(`http://em10vs0010.embraco.com:8002/api/v1/paletization/pallets/${palletID}/components/add/`, data)
      .then((response) => {
        if (response.status === 201) {
            notifyProductMounted(serial)
            console.log("MANDANDO A ACTUALIZAR LOS COMPONENTS")
            dispatch(getAllComponents(palletID));
        } else {
          dispatch(setError('Hubo un error al montar el componente.'));
        }
      })
      .catch((error) => {
        // Manejo de errores, si es necesario
      });
      
  };
  

  export const unmountComponentAPI = (palletIdentifier, component) => (dispatch) => {
    // Realiza una solicitud DELETE para desmontar el componente
    axios
      .delete(`http://em10vs0010.embraco.com:8002/api/v1/paletization/pallets/${palletIdentifier}/components/${component.id}/dismount/`)
      .then((response) => {
        if (response.status === 204) {
            notifyProductUnmounted(component.compUnitSerial);
          // La solicitud DELETE se completó con éxito (código de estado 204)
          // Actualiza la lista de componentes
          dispatch(getAllComponents(palletIdentifier));
        }
      })
      .catch((error) => {
        // Maneja los errores, como lo hiciste anteriormente
        endpointsCodes(error, dispatch, setNotFound);
      });
  };

  export const processInSAP = (orderSelected, pallet, components) => (dispatch) => {
    const currentDatetime = new Date();
    const currentDate = currentDatetime.toISOString().split('T')[0];
    const currentTime = currentDatetime.toLocaleTimeString('en-US', { hour12: false });
    const ItJsonInst = components.map((component) => ({
      sernr: component.condenser_unit_serial,
      serfi: component.compressor_unit_serial,
      matnr: component.condenser_material_code,
      matfi: component.compressor_material_code,
      t: "S"
    }));

    const xmlData = {
      IArbpl: orderSelected.arbpl,
      IAufnr: orderSelected.aufnr,
      ICharg: pallet.identifier,
      IDataProd: currentDate,
      IHoraProd: currentTime,
      IQuantProd: ItJsonInst.length,
      ItJsonInst: ItJsonInst
    };
    console.log(xmlData);
  }