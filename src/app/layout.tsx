import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { getServerSideAuth } from "@/lib/getServerSideAuth";
import { AuthRedirect } from "@/components/AuthRedirect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyScript",
  description: "TinyScript",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, user } = await getServerSideAuth();

  // Add this line before passing user to AuthProvider
  const fullUser = user
    ? {
        ...user,
      }
    : null;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider initialAuth={auth} initialUser={fullUser}>
            <AuthRedirect />
            <Navbar />
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
