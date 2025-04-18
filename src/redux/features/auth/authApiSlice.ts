import apiSlice from "@/redux/apiSlice";
import { setCredentials } from "./authSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (value) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: value,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success) {
            dispatch(setCredentials(data.data));
          }
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
    signUp: builder.mutation({
      query: (value) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: value,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (value) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: value,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success) {
            dispatch(setCredentials(data.data));
          }
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.success) {
            dispatch(setCredentials(null));
          }
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (params) => ({
        url: "/auth/forgot-password",
        method: "POST",
        params,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useForgotPasswordMutation,
  useSignOutMutation,
  useVerifyEmailMutation,
  useSignUpMutation,
  useRefreshTokenMutation,
} = authApiSlice;
