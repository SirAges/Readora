import apiSlice from "@/redux/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: () => [{ type: "User", id: "LIST" }],
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: "LIST" },
              { type: "User", id: result.id },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    searchUsers: builder.query({
      query: (params) => ({
        url: "/users/search/all",
        params,
      }),
    }),
    userStatistics: builder.query({
      query: (params) => ({
        url: "/users/statistics/all",
        params,
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUsersQuery,
  useSearchUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUserStatisticsQuery,
} = userApiSlice;
