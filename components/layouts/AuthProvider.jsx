"use client";

import { useProfileQuery } from "@/store/auth";
import { setUser } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  // getting user
  const user = useSelector((state) => state.user);
  console.log(user);

  const {
    data: profileData,
    isLoading,
    isError,
  } = useProfileQuery();

  // ✅ Sync API user → Redux store
  useEffect(() => {
    if (profileData?.data) {
      dispatch(setUser(profileData.data));
      if(profileData?.data?.role !== 'admin'){
        router.replace('/auth/login')
      }
    }
  }, [profileData]);

  // ✅ Authentication status (REAL logic)
  const isAuthenticated = !!user;

  // ✅ Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
    if(isError){
      router.replace("/auth/login")
    }
  }, [isLoading, isAuthenticated, router, isError]);

  // ✅ Prevent UI flash while checking auth
  if (isLoading) {
    return null; // or a loader component
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}