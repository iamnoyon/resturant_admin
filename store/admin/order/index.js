import { apiSlice } from "../../apiSlice";
import { transformListResponse } from "@/utils/responseTransformer";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    createWaiterOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/waiter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderList: builder.query({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params,
      }),
      transformResponse: (response) => transformListResponse(response),
      providesTags: ["Orders"],
    }),
    getOrderTokenList: builder.query({
      query: (params) => ({
        url: "/tokens",
        method: "GET",
        params,
      }),
      transformResponse: (response) => transformListResponse(response),
      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    getWaiterOrderById: builder.query({
      query: ({ id }) => ({
        url: `/orders/waiter/${id}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/waiter/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useCreateWaiterOrderMutation,
  useLazyGetOrderListQuery,
  useLazyGetOrderTokenListQuery,
  useGetOrderByIdQuery,
  useGetWaiterOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderSlice;
