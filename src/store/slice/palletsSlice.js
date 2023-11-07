import { createAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { endpointsCodes } from './endpointCodes';
import { notifyError, notifyGenealogyNotFound, notifyProductMounted, notifyProductUnmounted, notifyProductsJoined } from '../../partials/paletization/Toasts';

const initialState = {
    pallet: {},
    components : [],
    componentsJoined: false,
    genealogyData: {}
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
        setComponentsJoined: (state, action) => {
          state.componentsJoined = action.payload;
        },
        setGenealogyData: (state, action) => {
          state.genealogyData = action.payload;
        }
      },
});

export const {
    setPallet,
    setComponents,
    unmountComponent,
    setComponentsJoined,
    setGenealogyData
  } = palletsSlice.actions;
  

export const selectPallet = (state) => state.pallets.pallet;

export const selectComponents = (state) => state.pallets.components;

export const selectComponentsJoined = (state) => state.pallets.componentsJoined;

export const selectGenealogyData = (state) => state.pallets.genealogyData;

export default palletsSlice.reducer;

export const joinComponents = (payload) => (dispatch) => {
 
  axios
    .post(`http://em10vs0010.embraco.com:8002/api/v1/genealogy/component/`, payload)
    .then((response) => {
      if (response.status === 201) {
        notifyProductsJoined(payload.compressor_unit_serial)
        dispatch(setComponentsJoined(true));
        
      } else if (response.status === 404) {
        dispatch(setComponentsJoined(true));
        dispatch(notifyError('Hubo un error al unir los componentes, reintente.'));
      }
    })
    .catch((error) => {
      // Manejo de errores, si es necesario
    });
    
};

export const getCompressor = (condenserSerial) => async (dispatch) => {
  try {
    console.log("Validando condenser serial");
    const response = await axios.get(`http://em10vs0010.embraco.com:8002/api/v1/genealogy/component/?condenser_unit_serial=${condenserSerial}`);
    if (response.status === 200) {
      // dispatch(setGenealogyData(response.data));
      // dispatch(setComponentsJoined(true));
      return response.data;
    } else if (response.status === 404) {
      console.log("No se encontró genealogía");
      notifyGenealogyNotFound(condenserSerial);
    }
  } catch (error) {
    console.log("Error al obtener la genealogía", error);
    notifyGenealogyNotFound(condenserSerial);
    // Manejo de errores, si es necesario
  }
};


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
          //dispatch(setCompressorTestResults(response.data.results));
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

  export const mountComponent = (payload) => (dispatch) => {
    const palletId = payload.palette;
    const data = {
            pallet_id: payload.palette,
            condenser_unit_serial: payload.condenser,
            condenser_material_code: payload.condenserMaterial,
            compressor_unit_serial: payload.compressor,
            compressor_material_code: payload.compressorMaterial,
            material_type: "-"
    }
    console.log("Montando componente + ", data);
    axios
      .post(`http://em10vs0010.embraco.com:8002/api/v1/paletization/pallets/${palletId}/components/add/`, data)
      .then((response) => {
        console.log(response.status);
        console.log("MANDANDO A ACTUALIZAR LOS COMPONENTS")
        if (response.status === 201) {
            notifyProductMounted(payload.condenser)
            dispatch(getAllComponents(palletId));
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