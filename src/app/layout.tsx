import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";
import { getServerSideAuth } from "@/lib/getServerSideAuth";
import { AuthRedirect } from "@/components/AuthRedirect";
import ReactGA from "react-ga4";

const inter = Inter({ subsets: ["latin"] });

ReactGA.initialize("G-0J51VNPXCB");

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

  // MongoDB already provides _id, createdAt, and updatedAt fields
  const fullUser = user ? { _id: user.id, ...user } : null;

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
