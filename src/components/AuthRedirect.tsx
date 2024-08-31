"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function AuthRedirect() {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth === "no-auth" && window.location.pathname === "/app") {
      router.push("/");
      console.log("no-auth");
    } else {
      router.push("/app");
    }
  }, [auth, router]);

  return null;
}
