import { apiSlice } from "../../apiSlice";
import { transformListResponse } from "@/utils/responseTransformer";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    getUserList: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["userlist"],
      transformResponse: (response) => transformListResponse(response),
    }),
    updateUserStatus: builder.mutation({
      query: (data) => ({
        url: `/user/update-status/${data?.id}`,
        method: "PUT",
        body: { status: data.status },
      }),
      invalidatesTags: ["userlist"]
    }),
  }),
  overrideExisting: true,
});

export const { useCreateUserMutation, useLazyGetUserListQuery, useUpdateUserStatusMutation } = userApiSlice;
