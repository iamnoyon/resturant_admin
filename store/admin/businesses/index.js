import { apiSlice } from "../../apiSlice";
import { transformListResponse } from "@/utils/responseTransformer";

export const businessSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateBusiness: builder.mutation({
      query: (data) => ({
        url: "/business",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    getBusinessInfo: builder.query({
      query: () => ({
        url: "/business/my",
        method: "GET",
      }),
      providesTags: ["Orders"],
    })
  }),
  overrideExisting: true,
});

export const {
    useUpdateBusinessMutation,
    useGetBusinessInfoQuery
} = businessSlice;
