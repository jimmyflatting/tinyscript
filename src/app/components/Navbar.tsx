"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SettingsModal from "./SettingsModal";
import LoginModal from "./LoginModal";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { auth, user, setAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSettingsModal = () => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAuth("no-auth", null);
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  console.log(user);

  return (
    <>
      <nav className="sticky top-0 z-10 py-1 border-b-2 border-card backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center h-12">
          <div className="flex items-center space-x-4">
            <Link
              href={auth === "no-auth" ? "/" : "/app"}
              className="text-lg font-normal text-primary"
            >
              Tiny<span className="font-bold">Script</span>
            </Link>
          </div>
          <div>
            {auth === "no-auth" ? (
              <button
                onClick={toggleLoginModal}
                className="px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
              >
                Login / Register
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSettingsModal}
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:opacity-90 transition duration-300"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isSettingsModalOpen && (
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}

      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Navbar;
