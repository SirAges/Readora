import apiSlice from "@/redux/apiSlice";

export const borrowApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBorrowedBooks: builder.query({
      query: (params) => ({
        url: "/borrows",
        params,
      }),
      providesTags: () => [{ type: "Borrow", id: "LIST" }],
    }),
    getBorrowedBook: builder.query({
      query: (borrowId) => ({
        url: `/borrows/${borrowId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Borrow", id: "LIST" },
              { type: "Borrow", id: result.id },
            ]
          : [{ type: "Borrow", id: "LIST" }],
    }),
    getUserBorrowedBooks: builder.query({
      query: (params) => ({
        url: "/borrows/user/all",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Borrow", id: "LIST" },
              { type: "Borrow", id: result.id },
            ]
          : [{ type: "Borrow", id: "LIST" }],
    }),
    borrowBook: builder.mutation({
      query: (value) => ({
        url: "/borrows",
        method: "POST",
        body: value,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
    }),
    extendReturnDate: builder.mutation({
      query: (borrowId) => ({
        url: `/borrows/${borrowId}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
    }),
    cancelRequestForBorrowedBook: builder.mutation({
      query: (borrowId) => ({
        url: `/borrows/${borrowId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
    }),
    updateBorrowedBookStatus: builder.mutation({
      query: ({ borrowId, status }) => ({
        url: `/borrows/${borrowId}/status-update`,
        method: "PUT",
        body:  {status} ,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
    }),
    deleteborrow: builder.mutation({
      query: (borrowId) => ({
        url: `/borrows/${borrowId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Borrow", id: arg.id }],
    }),

    getAllBorrowedBookStatistics: builder.query({
      query: (params) => ({
        url: "borrows/statistics/all",
        params,
      }),
    }),
  }),
});

export const {
  useDeleteborrowMutation,
  useBorrowBookMutation,
  useCancelRequestForBorrowedBookMutation,
  useExtendReturnDateMutation,
  useGetAllBorrowedBookStatisticsQuery,
  useGetAllBorrowedBooksQuery,
  useGetBorrowedBookQuery,
  useGetUserBorrowedBooksQuery,
  useUpdateBorrowedBookStatusMutation,
} = borrowApiSlice;
