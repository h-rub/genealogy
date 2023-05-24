import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
// import usersSlice from './slice/usersSlice';
// import BaseCapabilitiesSlice from './slice/BaseCapabilitiesSlice';
// import LineRateCustomSlice from './slice/LineRateCustomSlice';
// import calendarSlice from './slice/calendarSlice';
// import planningSlice from './slice/planningSlice';
// import kpiSlice from './slice/kpiSlice';
// import systemStatusSlice from './slice/systemStatusSlice';
// import filterSlice from './slice/filterSlice';
// import ordersPlannedSlice from './slice/ordersPlannedSlice';
// import openOrdersSlice from './slice/openOrdersSlice';
// import demandPlanningOrdersSlice from './slice/DemandPlanningOrdersSlice';
// import ganttSlice from './slice/ganttSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    // users: usersSlice,
    // group: BaseCapabilitiesSlice,
    // calendar: calendarSlice,
    // planning: planningSlice,
    // kpi: kpiSlice,
    // systemStatus: systemStatusSlice,
    // filter: filterSlice,
    // orders: ordersPlannedSlice,
    // openOrders: openOrdersSlice,
    // demandPlanningOrders: demandPlanningOrdersSlice,
    // LineRateCustom: LineRateCustomSlice,
    // gantt: ganttSlice,
  },
});

export default store;