"use client";

import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function Navbar() {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "px-4 lg:px-6 h-14 flex items-center sticky top-0 z-10",
        pathname === "/app" ? "bg-background border-b border-primary/20" : ""
      )}
    >
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        Tiny<span className="font-bold">Script</span>
      </Link>

      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <SignedOut>
          <Link
            href="/login"
            className={cn(
              "text-sm font-medium hover:underline underline-offset-4",
              pathname === "/login" ? "underline" : ""
            )}
            prefetch={false}
          >
            Login
          </Link>
        </SignedOut>
        <SignedIn>
          <ClerkLoading>
            <p className="text-sm font-medium hover:underline underline-offset-4 hover:cursor-pointer">
              Sign out
            </p>
          </ClerkLoading>
          <SignOutButton redirectUrl="/">
            <p className="text-sm font-medium hover:underline underline-offset-4 hover:cursor-pointer">
              Sign out
            </p>
          </SignOutButton>
        </SignedIn>
        <SignedIn>
          <Link
            href="/account"
            className={cn(
              "text-sm font-medium hover:underline underline-offset-4",
              pathname === "/account" ? "underline" : ""
            )}
            prefetch={false}
          >
            Account
          </Link>
        </SignedIn>
        <SignedOut>
          <Link
            href="/register"
            className={cn(
              "text-sm font-medium hover:underline underline-offset-4",
              pathname === "/register" ? "underline" : ""
            )}
            prefetch={false}
          >
            Get started
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/app"
            className={cn(
              "text-sm font-medium hover:underline underline-offset-4",
              pathname === "/app" ? "underline" : ""
            )}
            prefetch={false}
          >
            App
          </Link>
        </SignedIn>
      </nav>
    </header>
  );
}

export default Navbar;
