import React from 'react';

import { useDispatch } from 'react-redux';

import { setOrderSelected, getMetadataFromOrder } from '../../store/slice/orderSelectedSlice';

import { addEvent } from '../../store/slice/eventsLogSlice';
import { notifyOrderSelected } from '../paletization/Toasts';

function OrdersTableItem(props) {
  const dispatch = useDispatch();

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <button  onClick={() => {
            const eventOrderSelected = {
              text: 'Orden ' + props.id + ' seleccionada',
              timestamp: new Date().toISOString(),
            };
            console.log(props)
            notifyOrderSelected(props.id);
            dispatch(setOrderSelected(props))
            const idMaterial = props.matnr.substring(props.matnr.length - 9);
            dispatch(getMetadataFromOrder(idMaterial))
            dispatch(addEvent(eventOrderSelected))
            const escapeKeyEvent = new KeyboardEvent('keydown', {
              key: 'Escape',
              keyCode: 27,
              code: 'Escape',
              which: 27,
              bubbles: true,
              cancelable: true,
            });
            document.dispatchEvent(escapeKeyEvent);
            }
            }><a className="font-medium text-primary hover:text-primary ">{props.aufnr}</a></button>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.arbpl}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.matnr}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center text-md font-medium text-gray">{props.qtdpl}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.qtdpr}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left text-md font-medium text-gray">{props.gstrp}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        {/* Menu button */}
      </td>
    </tr>
  );
}

export default OrdersTableItem;
