"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

function Toast() {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Subscription successful! You're all set.");
      setIsVisible(true);
    } else if (query.get("canceled")) {
      setMessage("Subscription canceled. You can try again when you're ready.");
      setIsVisible(true);
    }

    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (user?.subscriptionStatus === "active") {
      setMessage("Subscription active!");
      setIsVisible(true);
    }
  }, [user?.subscriptionStatus]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-secondary text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
}

export default Toast;
