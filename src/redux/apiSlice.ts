import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials } from "@/redux/features/auth/authSlice";

// Load from env
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// Custom baseQuery with token refresh logic
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const state = api.getState() as RootState;
  const token = state.auth.token;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  // First request attempt
  let result = await rawBaseQuery(args, api, extraOptions);

  // If token expired (403), try to refresh
  if (result?.error?.status === 403) {
    console.log("Access token expired, attempting refresh");

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    // If refresh successful
    // @ts-expect-error untyped API response
    if (refreshResult?.data?.success) {
      // @ts-expect-error untyped API response
      api.dispatch(setCredentials(refreshResult.data.data));

      // Invalidate relevant tags to refetch fresh data
      api.dispatch(
        apiSlice.util.invalidateTags(["User", "Book", "Borrow", "Review"])
      );

      // Retry original request
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh token failed — logout user
      if (refreshResult?.error?.status === 400) {
        console.log("Refresh token expired. Logging out.");
        api.dispatch(setCredentials(null));
      }
      return refreshResult;
    }
  }

  return result;
};

// API Slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Book", "Borrow", "Review"],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
});

export default apiSlice;
