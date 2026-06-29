import { apiSlice } from "../../apiSlice";

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Categories']
    }),
    getCategoryList: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ['Categories']
    }),
  }),
  overrideExisting: true,
});

export const {
    useCreateCategoryMutation,
    useGetCategoryListQuery
} = categorySlice;
