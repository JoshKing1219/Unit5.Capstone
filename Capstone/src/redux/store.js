import { configureStore } from "@reduxjs/toolkit";
import { rabbitHoleApi } from "../api/index";

export const store = configureStore({
  reducer: {
    [rabbitHoleApi.reducerPath]: rabbitHoleApi.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(rabbitHoleApi.middleware),
});

export default store;