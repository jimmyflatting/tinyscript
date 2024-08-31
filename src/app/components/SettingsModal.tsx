import React, { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleSubscribe = async () => {
    await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleCancelSubscription = () => {
    // Handle subscription cancellation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Settings</h2>
          <button onClick={onClose} className="text-text hover:text-primary">
            Close
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card rounded-[0.5rem] p-8 text-text">
            <h3 className="text-[22px] text-primary mb-4">Account Settings</h3>
            <form
              id="profile-form"
              className="flex flex-col gap-4 mb-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="p-2 border border-primary rounded-[0.5rem] bg-background text-text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 border border-primary rounded-[0.5rem] bg-background text-text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border border-primary rounded-[0.5rem] bg-background text-text"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90"
              >
                Save Changes
              </button>
            </form>
          </div>
          {!isSubscribed ? (
            <div className="bg-card rounded-[0.5rem] p-8 text-text">
              <h3 className="text-[22px] text-primary mb-4">Upgrade to Pro</h3>
              <p className="mb-4">
                Unlock unlimited access with a Pro subscription!
              </p>

              <div className="border-2 border-primary rounded-[0.5rem] p-4 text-center shadow-[0_0_10px_rgba(126,235,216,0.3)]">
                <h4 className="text-primary text-[22px] mb-2">
                  Pro Membership
                </h4>
                <p className="text-[26px] font-bold mb-4">
                  $5<span className="text-[14px] font-normal">/week</span>
                </p>
                <button
                  onClick={handleSubscribe}
                  className="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90"
                >
                  Subscribe
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-[0.5rem] p-8 text-text">
              <div className="flex flex-col mb-8 gap-2 capitalize">
                <h3 className="text-[22px] text-primary">Pro Subscription</h3>
                <p>You are subscribed to the Pro plan.</p>
              </div>

              <button
                onClick={handleCancelSubscription}
                className="border border-primary text-primary rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90"
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
