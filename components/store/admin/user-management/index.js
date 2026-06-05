import { apiSlice } from "../../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        body: data,
      }),
    }),
    getUserList: builder.query({
      query: (params) => ({
        url: "/user/list",
        method: "GET",
        params,
      }),
      providesTags: ["userlist"]
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
