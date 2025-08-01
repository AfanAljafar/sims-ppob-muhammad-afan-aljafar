import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceReducer from "./servicesSlice";

const store = configureStore({
  reducer: { auth: authReducer, services: serviceReducer },
});
export default store;
