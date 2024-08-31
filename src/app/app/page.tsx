import React from "react";
import Chat from "../components/Chat";
import Toast from "../components/Toast";
import ReactGA from "react-ga4";

const Page: React.FC = () => {
  ReactGA.send({
    hitType: "pageview",
    page: "/app",
    title: "App Page",
  });
  return (
    <div className="bg-background text-text h-full container">
      <Chat />
      <Toast />
    </div>
  );
};

export default Page;
