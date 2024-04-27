import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: true,
};

const refetchSlice = createSlice({
  name: "refetchSlice",
  initialState,
  reducers: {
    toggle: (state) => {
      state.state = !state.state;
    },
  },
});

export const { toggle } = refetchSlice.actions;
export default refetchSlice.reducer;
