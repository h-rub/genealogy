import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setOrderSelected, getMetadataFromOrder } from '../../store/slice/orderSelectedSlice';

import { addEvent } from '../../store/slice/eventsLogSlice';
import { unmountComponent, unmountComponentAPI, selectPallet } from '../../store/slice/palletsSlice';

function ComponentsItem(props) {
  const dispatch = useDispatch();
  const palletSelected = useSelector(selectPallet);

  const handleUnmount = () => {
    // Llama a la acción para eliminar el componente por su id
    dispatch(unmountComponentAPI(palletSelected.identifier, props));
    //dispatch(unmountComponent(props));
  };


  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <button  onClick={() => {
            }
            }><a className="font-medium text-primary hover:text-primary ">{props.rowNumber}</a></button>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.condMaterialCode}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.condUnitSerial}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-6 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.compMaterialCode}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.compUnitSerial}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center font-medium text-gray">{props.materialType}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
        <button onClick={handleUnmount} className="text-center font-semibold text-red-500">Desmontar</button>
      </td>
    </tr>
  );
}

export default ComponentsItem;
