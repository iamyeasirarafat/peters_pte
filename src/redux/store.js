import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./slice/layoutSlice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
  },
});
