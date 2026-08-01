"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "@/store/user";

export default function SessionSync() {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
          profileImageUrl: session.user.profileImageUrl,
          permissions: session.user.permissions,
        })
      );
      dispatch(setToken(session.user.backendToken));
    }
  }, [session, dispatch]);

  return null;
}
