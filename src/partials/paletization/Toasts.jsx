import { toast } from 'react-hot-toast';

// Toast de éxito
export const notifyPalletScanned = (code) => toast.success('Pallet escaneado: ' + code);

export const notifyOrderSelected = (number) => toast.success(`Orden ${number} seleccionada`);

export const notifyProductScanned = (code) => toast.success('Producto escaneado: ' + code, { style: {} });

export const notifyProductMounted = (code) => toast.success('Producto montado: ' + code, { style: {} });

export const notifyProductUnmounted = (code) => toast.success('Producto desmontado: ' + code, { style: {} , icon: 'ℹ️' });

// Toast de error
export const notifyError = (message) => toast.error(message);

// Otros toasts personalizados
// ...

// Puedes definir tantos toasts personalizados como necesites