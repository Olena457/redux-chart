import { configureStore } from "@reduxjs/toolkit";
import experimentsReducer from "../redux/experiment/experimentsSlice.js";

export const store = configureStore({
  reducer: {
    experiments: experimentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
