import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  onClose: () => void;
}

function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleCredentialResponse = async (credentialResponse: any) => {
    try {
      const { data: user } = await axios.post("/api/auth", {
        credential: credentialResponse.credential,
      });

      console.log("User:", user);
      sessionStorage.setItem("user", JSON.stringify(user));
      setAuth("authenticated", user); // Update auth state
      onClose(); // Close the modal
      router.refresh(); // Refresh the page to trigger server-side auth check
    } catch (error) {
      console.error("Authentication failed:", error);
      // TODO: Show error message to user
    }
  };

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Login / Register</h2>
        <div className="space-y-6">
          {/* Google Sign In */}
          <div className="flex justify-center">
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
            >
              <GoogleLogin
                onError={() => console.log("Error: ", Error)}
                onSuccess={handleCredentialResponse}
              />
            </GoogleOAuthProvider>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-text"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-md text-text placeholder-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-md text-text placeholder-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-text rounded bg-background"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-text"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-accent"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Continue with email
            </button>
          </form>
        </div>
        <button onClick={onClose} className="mt-6 text-text hover:text-primary">
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
