import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/u" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Fetch user details
    fetchMe: builder.query<Me, void>({
      query: () => ({
        url: "/me",
      }),
      transformResponse: (response: Me) => {
        return response;
      },
      transformErrorResponse({ data }) {
        return (
          (data as { message: string }).message ||
          "An Error Occurred while fetching user details"
        );
      },
    }),
  }),
});

export const { useFetchMeQuery } = userSlice;
