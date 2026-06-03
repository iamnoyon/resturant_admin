import { apiSlice } from "../../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getPermissionList: builder.query({
            query: () => ({
                url: '/admin/permissions/list',
                method: 'GET',
            })
        }),
    }),
    overrideExisting: true
});

export const {useGetPermissionListQuery} = userApiSlice;