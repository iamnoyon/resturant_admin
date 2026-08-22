"use client";

import { signOut } from "next-auth/react";
import { store } from "@/store";
import { clearUser, clearToken } from "@/store/user";
import { apiSlice } from "@/store/apiSlice";

let isLoggingOut = false;

export async function performLogout() {
  if (isLoggingOut) return;
  isLoggingOut = true;

  try {
    sessionStorage.removeItem("backend_token");
  } catch {}

  store.dispatch(apiSlice.util.resetApiState());
  store.dispatch(clearUser());
  store.dispatch(clearToken());

  try {
    await signOut({ redirect: false });
  } catch {}

  window.location.replace("/");
}
