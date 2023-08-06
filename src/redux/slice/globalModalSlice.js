import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    visible: false,
    data: {},
  },
};

const globalModalSlice = createSlice({
  name: "globalModalSlice",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.state.visible = !state.state.visible;
      state.state.data = action.payload;
      return state;
    },
  },
});

export const { toggleModal } = globalModalSlice.actions;
export default globalModalSlice.reducer;
