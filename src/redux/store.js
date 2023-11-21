import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localStorage from "reduxjs-toolkit-persist/lib/storage/index";
import { authSlice } from "./features/auth";
import { employeesSlice } from "./features/employeesList";
import { createEmployeeSlice } from "./features/createEmployee";
import { leavesSlice } from "./features/leavesList";
let persistConfig = {
  key: "root",
  storage: localStorage,
  // blacklist: ["loader", "login", "transactionTable"],
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  employees: employeesSlice.reducer,
  createEmployee: createEmployeeSlice.reducer,
  leaves:leavesSlice.reducer
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export default store;
