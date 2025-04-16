import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authReducer from "@/redux/features/auth/authSlice";
import bookReducer from "@/redux/features/book/bookSlice";
import borrowReducer from "@/redux/features/borrow/borrowSlice";
import userReducer from "@/redux/features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      book: bookReducer,
      borrow: borrowReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
