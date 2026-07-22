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
    getUserInfoById: builder.query({
      query: ({id}) => ({
        url: `/users/${id}`,
        method: 'GET'
      })
    }),
    updateUserInfo: builder.mutation({
      query: ({id, data})=>({
        url: `/users/${id}`,
        method: "PATCH",
        body: data 
      })
    }),
    getPermissionsByUserId: builder.query({
      query: ({id})=>({
        url: `/permissions/users/${id}`,
        method: 'GET'
      })
    }),
    updatePermissionsByUserId: builder.mutation({
      query: ({id, data})=>({
        url: `/permissions/users/${id}`,
        method: 'PUT',
        body: data
      })
    })
  }),
  overrideExisting: true,
});

export const {
  useCreateUserMutation,
  useLazyGetUserListQuery,
  useUpdateUserStatusMutation,
  useGetUserInfoByIdQuery,
  useUpdateUserInfoMutation,
  useGetPermissionsByUserIdQuery,
  useUpdatePermissionsByUserIdMutation
} = userApiSlice;
