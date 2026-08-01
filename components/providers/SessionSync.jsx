"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@/store/user";
import { useProfileQuery } from "@/store/auth";

export default function SessionSync() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user?.backendToken) {
      dispatch(setToken(session.user.backendToken));
    }
  }, [session, dispatch]);

  const { data: profileData } = useProfileQuery();

  useEffect(() => {
    if (profileData?.data) {
      dispatch(setUser(profileData.data));
    }
  }, [profileData, dispatch]);

  return null;
}
