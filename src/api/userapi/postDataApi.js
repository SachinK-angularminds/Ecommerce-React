import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postsPerPage = 10;

export const postDataApi = createApi({
  reducerPath: "postDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Posts"], 
  endpoints: (build) => ({
    listPosts: build.query({
      query: (page = 1) => `posts?_start=${page}&_limit=${postsPerPage}`,
      providesTags: ["Posts"],
      transformResponse: (response) => {
        return response;
      }, 
    }),
    createPosts:build.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],      
    })
  }),
});

export const { useListPostsQuery,useCreatePostsMutation } = postDataApi;
