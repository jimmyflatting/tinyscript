import React from "react";
import Chat from "../components/Chat";
import Toast from "../components/Toast";

const Page: React.FC = () => {
  return (
    <div className="flex bg-background text-text h-full container">
      <Chat />
      <Toast />
    </div>
  );
};

export default Page;
