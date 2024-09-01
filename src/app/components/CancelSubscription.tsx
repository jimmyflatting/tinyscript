import React, { useState } from "react";
import Spinner from "./Spinner";
import { useAuth } from "@/contexts/AuthContext";

const CancelSubscription: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleCancelSubscription = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout/cancel-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      const result = await response.json();
      console.log("Subscription canceled:", result);
      // TODO: Update UI or show a success message
    } catch (error) {
      console.error("Error canceling subscription:", error);
      // TODO: Show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Subscription Management
      </h2>
      <div className="mb-6">
        <span className="text-sm font-semibold text-text">Current Status:</span>
        <span
          className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
            user?.subscriptionStatus === "active"
              ? "bg-primary text-background"
              : user?.subscriptionStatus === "canceling"
              ? "bg-accent text-background"
              : "bg-secondary text-background"
          }`}
        >
          {(user?.subscriptionStatus?.charAt(0).toUpperCase() ?? "") +
            (user?.subscriptionStatus?.slice(1) ?? "")}
        </span>
      </div>
      {user?.subscriptionStatus === "active" && !user?.cancelAtPeriodEnd && (
        <button
          onClick={handleCancelSubscription}
          className="w-full bg-secondary hover:bg-accent text-background font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Cancel Subscription"}
        </button>
      )}
      {user?.subscriptionStatus === "canceling" && (
        <p className="text-sm text-text bg-card border-l-4 border-accent p-4 rounded">
          Your subscription will be canceled at the end of the current billing
          period.
        </p>
      )}
    </div>
  );
};

export default CancelSubscription;
