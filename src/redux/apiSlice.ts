import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { setCredentials } from "@/redux/features/auth/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState; // Type the api object correctly as RootState
  const token = state.auth.token;
  const baseQueryFunction = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  });

  let result = await baseQueryFunction(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("Access token expired, attempting refresh");

    const refreshResult = await baseQueryFunction(
      { url: "/api/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      result = await baseQueryFunction(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        console.log("Refresh token expired. Logging out.");
        api.dispatch(setCredentials(null));
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Book", "Borrow", "Review"],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});

export default apiSlice;
