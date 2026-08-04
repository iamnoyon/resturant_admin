"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "@/store/user";
import { useProfileQuery } from "@/store/auth";
import { signOut } from "next-auth/react";

export default function SessionSync() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state?.user?.token);

  // Use session token directly (synchronous) instead of Redux token (async)
  const token = session?.user?.backendToken || reduxToken;

  // Restore token from sessionStorage on mount (cross-tab support)
  useEffect(() => {
    if (!reduxToken) {
      const stored = sessionStorage.getItem("backend_token");
      if (stored) {
        dispatch(setToken(stored));
      }
    }
  }, [reduxToken, dispatch]);

  // Set token from session + persist to sessionStorage
  useEffect(() => {
    if (session?.user?.backendToken) {
      dispatch(setToken(session.user.backendToken));
      sessionStorage.setItem("backend_token", session.user.backendToken);
    }
  }, [session, dispatch]);

  const { data: profileData, isError } = useProfileQuery(token, { skip: !token });

  useEffect(() => {
    if (profileData?.data) {
      dispatch(setUser(profileData.data));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    if (isError && token) {
      sessionStorage.removeItem("backend_token");
      signOut({ redirect: false });
      window.location.href = "/";
    }
  }, [isError, token]);

  return null;
}
