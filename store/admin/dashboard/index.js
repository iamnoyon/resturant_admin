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
    getAdminChart: builder.query({
      query: () => ({
        url: '/dashboard/charts',
        method: "GET"
      })
    }),
    getRecentOderList: builder.query({
      query: (params) => ({
        url: '/dashboard/recent-orders',
        method: 'GET',
        params
      })
    }),
    getSuperAdminSummaryCard: builder.query({
      query: (params) => ({
        url: '/dashboard/admin/overview',
        method: 'GET',
        params
      })
    }),
    getSuperAdminCharts: builder.query({
      query: (params) => ({
        url: '/dashboard/admin/charts',
        method: 'GET',
        params
      })
    })
  }),
  overrideExisting: true,
});

export const {
    useGetAdminSummaryCardQuery,
    useGetAdminChartQuery,
    useGetRecentOderListQuery,
    useGetSuperAdminSummaryCardQuery,
    useLazyGetSuperAdminChartsQuery
} = dashboardSlice;
