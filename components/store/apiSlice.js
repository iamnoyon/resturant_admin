import { siteConfig } from "@/config/siteConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ── Refresh lock ──────────────────────────────
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const resolveSubscribers = (success) => {
  refreshSubscribers.forEach((cb) => cb(success));
  refreshSubscribers = [];
};

// ── Base query ────────────────────────────────
const baseQuery = fetchBaseQuery({
  baseUrl: siteConfig?.baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    // ✅ Removed global Content-Type (breaks file uploads)
    headers.set("Accept", "application/json");
    return headers;
  },
});

// ── Wrapper with re-auth ──────────────────────
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // ✅ Guard: skip refresh logic for refresh endpoint itself (prevents infinite loop)
  const isRefreshCall =
    typeof args === "string"
      ? args === "/auth/token-refresh"
      : args?.url === "/auth/token-refresh";

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 && !isRefreshCall) {
    // ✅ If already refreshing, wait for it to finish then retry
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh(async (success) => {
          if (success) {
            resolve(await baseQuery(args, api, extraOptions));
          } else {
            resolve(result);
          }
        });
      });
    }

    // ✅ Acquire refresh lock
    isRefreshing = true;

    try {
      const refreshResult = await baseQuery(
        { url: "/auth/token-refresh", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult?.data?.success) {
        // ✅ Notify queued requests and retry
        resolveSubscribers(true);
        result = await baseQuery(args, api, extraOptions);
      } else {
        // ✅ Logout properly — dispatch + redirect
        resolveSubscribers(false);
        api.dispatch(logout());

        await baseQuery(
          { url: "/auth/logout", method: "POST" },
          api,
          extraOptions
        );

        if (typeof window !== "undefined") {
          // ✅ replace() prevents back-navigation to protected page
          window.location.replace("/");
        }

        return result;
      }
    } catch {
      // ✅ Network failure during refresh
      resolveSubscribers(false);

      if (typeof window !== "undefined") {
        window.location.replace("/");
      }

      return result;
    } finally {
      // ✅ Always release the lock
      isRefreshing = false;
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});