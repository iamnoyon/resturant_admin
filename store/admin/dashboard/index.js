import { transformListResponse } from "@/utils/responseTransformer";
import { apiSlice } from "../../apiSlice";

export const dashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSummaryCard: builder.query({
      query: () => ({
        url: "/dashboard/summary",
        method: "GET",
      }),
    }),
    
  }),
  overrideExisting: true,
});

export const {
    useGetAdminSummaryCardQuery,
} = dashboardSlice;
