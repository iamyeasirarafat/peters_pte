import { configureStore } from "@reduxjs/toolkit";
import globalModalSlice from "./slice/globalModalSlice";
import layoutSlice from "./slice/layoutSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    layout: layoutSlice,
    globalModal: globalModalSlice,
    user: userSlice,
  },
});
