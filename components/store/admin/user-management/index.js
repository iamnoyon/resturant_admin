import { apiSlice } from "../../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createUser: builder.mutation({
            query: (data) => ({
                url: '/user/create',
                method: 'POST',
                body: data
            })
        }),
        getUserList: builder.query({
            query: (params) => ({
                url: '/user/list',
                method: 'GET',
                params
            })
        })
    }),
    overrideExisting: true
});

export const {useCreateUserMutation, useLazyGetUserListQuery} = userApiSlice;