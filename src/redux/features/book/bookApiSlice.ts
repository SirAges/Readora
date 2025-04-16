import apiSlice from "@/redux/apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Book", id: arg.id }],
    }),
    getBooks: builder.query({
      query: (params) => ({
        url: "/books",
        params,
      }),
      providesTags: () => [{ type: "Book", id: "LIST" }],
    }),
    getBook: builder.query({
      query: (bookId) => ({
        url: `/books/${bookId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Book", id: "LIST" },
              { type: "Book", id: result.id },
            ]
          : [{ type: "Book", id: "LIST" }],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, data }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Book", id: arg.id }],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Book", id: arg.id }],
    }),
    searchBooks: builder.query({
      query: (params) => ({
        url: "/books/search/all",
        params,
      }),
    }),
    bookStatistics: builder.query({
      query: () => ({
        url: "books/statistics/all",
      }),
    }),

    // REVIEWS

    reviewBook: builder.mutation({
      query: ({ value, bookId }) => ({
        url: `/reviews/${bookId}`,
        method: "POST",
        body: value,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Review", id: arg.id }],
    }),
    getBookReviews: builder.query({
      query: ({ params, bookId }) => ({
        url: `/reviews/${bookId}/reviews`,
        params,
      }),
      providesTags: () => [{ type: "Review", id: "LIST" }],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Review", id: arg.id }],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Review", id: arg.id }],
    }),
    reviewStatistics: builder.query({
      query: () => ({
        url: "reviews/statistics/all",
      }),
    }),
  }),
});

export const {
  useBookStatisticsQuery,
  useCreateBookMutation,
  useGetBookQuery,
  useGetBooksQuery,
  useSearchBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useDeleteReviewMutation,
  useGetBookReviewsQuery,
  useReviewBookMutation,
  useReviewStatisticsQuery,
  useUpdateReviewMutation,
} = bookApiSlice;
