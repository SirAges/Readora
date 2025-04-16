import { createSlice } from "@reduxjs/toolkit";
import { CombinedState } from "@reduxjs/toolkit/query";
const initialState = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJMSUJSQVJJQU4iLCJlbWFpbCI6ImVrZWxlMTlzdGVwaGVuOTZ1QGdtYWlsLmNvbSIsImlhdCI6MTc0NDcyMDc0NiwiZXhwIjoxNzQ0ODA3MTQ2fQ.4mW47j2De0xqkxX9zEEWrIZ4qjQXeGxXMgRTwpScEdo",
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
