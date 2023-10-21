import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  user: {},
  isError: false,
  error: "",
};
export const getUser = createAsyncThunk("getUser", async () => {
  const res = await axios.get("https://api.codebyamirus.link/user/profile");
  return res.data;
});
const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isError = true;
      });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
