import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  data: {},
};

const globalModalSlice = createSlice({
  name: "globalModalSlice",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.visible = !state.visible;
      state.data = action.payload;
      return state;
    },
  },
});

export const { toggleModal } = globalModalSlice.actions;
export default globalModalSlice.reducer;
