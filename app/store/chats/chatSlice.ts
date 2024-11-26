import { createPostSchema, deletePostSchema } from "@/app/models/ChatSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatSlice = createApi({
  reducerPath: "Chat",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/ch" }),
  endpoints: (builder) => ({
    // Query All Users's Posts
    fetchAllPosts: builder.query<Post, void>({
      query: () => ({
        method: "GET",
        url: "/readall",
      }),
      providesTags: ["Chat"],
      transformResponse: (response: Post) => {
        return response;
      },
      transformErrorResponse: ({ data }) => {
        return (
          (data as { message: string }).message || "An Unknown Error Occurred"
        );
      },
    }),

    // Post Mutation
    createPost: builder.mutation({
      query: (data: createPostSchema) => ({
        url: "/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),

      invalidatesTags: ["Chat"],
      transformResponse: (response: CustomResponse) => {
        return response;
      },

      transformErrorResponse: ({ data }) => {
        return (
          (data as { message: string }).message || "An Unknown Error Occurred"
        );
      },
    }),

    // Delete Mutation
    deletePost: builder.mutation({
      query: (data: deletePostSchema) => ({
        url: "/delete",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),

      invalidatesTags: ["Chat"],
      transformResponse: (response: { message: string; status: number }) => {
        return response?.message;
      },

      transformErrorResponse: ({ data }) => {
        return (
          (data as { message: string }).message || "An Unknown Error Occurred"
        );
      },
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = chatSlice;
