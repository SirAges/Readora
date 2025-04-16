import { createSlice } from "@reduxjs/toolkit";
import { CombinedState } from "@reduxjs/toolkit/query";
const initialState = {
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: {
  //@ts-expect-error type error
  api: CombinedState<object, string, string>;
  auth: { token: string | null };
}) => state.auth.token;
