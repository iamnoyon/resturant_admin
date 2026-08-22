"use client";

import { signOut } from "next-auth/react";
import { store } from "@/store";
import { clearUser, clearToken } from "@/store/user";
import { apiSlice } from "@/store/apiSlice";

let isLoggingOut = false;

export function performLogout() {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    sessionStorage.removeItem("backend_token");
  } catch {}

  signOut({ redirect: false }).finally(() => {
    try {
      store.dispatch(apiSlice.util.resetApiState());
      store.dispatch(clearUser());
      store.dispatch(clearToken());
    } catch {}
    window.location.href = "/";
  });
}
