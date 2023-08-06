import { configureStore } from "@reduxjs/toolkit";
import globalModalSlice from "./slice/globalModalSlice";
import layoutSlice from "./slice/layoutSlice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    globalModal: globalModalSlice,
  },
});
