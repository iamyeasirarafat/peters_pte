import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topNav: true,
  sideNav: true,
};

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    toggleTopNav: (state) => {
      state.topNav = !state.topNav;
    },

    toggleSideNav: (state) => {
      state.sideNav = !state.sideNav;
    },
  },
});

export const { toggleSideNav, toggleTopNav } = layoutSlice.actions;
export default layoutSlice.reducer;
