import { apiSlice } from "../apiSlice";

const publicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }),
        profile: builder.query({
            query: ()=>({
                url: '/auth/profile',
                method: 'GET'
            })
        }),
        logout: builder.mutation({
            query: ()=>({
                url: '/logout',
                method: 'POST'
            })
        })
    }),
    overrideExisting: true
});

export const {useLoginMutation, useProfileQuery, useLogoutMutation} = publicApiSlice