import { siteConfig } from "@/config/siteConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: siteConfig?.baseUrl,
  credentials: "include",
});

let isRefreshing = false;
let pendingQueue = [];

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isUnauthorized = result?.error?.status === 401;

  if (isUnauthorized) {
    if (!isRefreshing) {
      isRefreshing = true;

      const refreshResult = await baseQuery(
        {
          url: "/auth/token-refresh",
          method: "POST",
        },
        api,
        extraOptions
      );

      isRefreshing = false;

      if (refreshResult?.data?.success) {
        // retry original request
        result = await baseQuery(args, api, extraOptions);

        // resolve queue
        pendingQueue.forEach((cb) => cb());
        pendingQueue = [];
      } else {
        // refresh failed → stop everything
        pendingQueue = [];

        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    } else {
      // wait until refresh finishes
      await new Promise((resolve) => pendingQueue.push(resolve));
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
  tagTypes: ["userlist", "Categories", "Products", "tables", "expenses", "Orders"]
});