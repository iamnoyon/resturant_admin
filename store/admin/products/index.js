import { apiSlice } from "../../apiSlice";
import { transformListResponse } from "@/utils/responseTransformer";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductList: builder.query({
      query: (params) => ({
        url: "/products",
        method: "GET",
        params,
      }),
      providesTags: ["Products"],
      transformResponse: (response) => transformListResponse(response),
    }),
    getCategoryById: builder.query({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),
    updateCategoryByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    getCategoryDropdown: builder.query({
      query: () => ({
        url: `/categories/dropdown`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateProductMutation,
  useLazyGetProductListQuery,
} = productSlice;
