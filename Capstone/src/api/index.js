import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rabbitHoleApi = createApi({
  reducerPath: "rabbitHoleApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),

  tagTypes: ["User", "reviews", "comments", "replies"],
  endpoints: (builder) => ({
    getTheories: builder.query({
      query: () => "/api/theories",
    }),
    getTheory: builder.query({
      query: (id) => `/api/theories/${id}`,
      providesTags: ["reviews", "comments", "replies"],
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: (token) => ({
        url: "/api/auth/me",
        headers: {
          authorization: `${token}`,
        },
      }),
      providesTags: ["User"],
    }),

    createReview: builder.mutation({
      query: ({ id, form, score, token }) => ({
        url: `/api/theories/${id}/reviews`,
        method: "POST",
        headers: {
          authorization: `${token}`,
        },
        body: {
          user_review: form.user_review,
          score: score,
        },
      }),
      invalidatesTags: ["reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/api/theories/reviews/${id}`,
        method: "PUT",
        headers: {
          authorization: `${token}`,
        },
        body,
      }),
    }),

    createComment: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/api/reviews/${id}/comments`,
        method: "POST",
        headers: {
          authorization: `${token}`,
        },
        body,
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
      }),
      invalidatesTags: ["comments"],
    }),

    createReply: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/api/comments/${id}/replies`,
        method: "POST",
        headers: {
          authorization: `${token}`,
        },
        body,
      }),
      invalidatesTags: ["replies"],
    }),
  }),
});

export const {
  useGetTheoriesQuery,
  useGetTheoryQuery,
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useCreateReviewMutation,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useDeleteCommentMutation,
} = rabbitHoleApi;
