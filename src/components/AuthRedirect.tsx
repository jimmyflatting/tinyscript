"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function AuthRedirect() {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth === "authenticated" && window.location.pathname === "/") {
      router.push("/app");
    }
  }, [auth, router]);

  return null;
}
