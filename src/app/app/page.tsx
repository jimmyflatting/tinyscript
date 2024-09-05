import React from "react";
import Interface from "@/components/Chat/Interface";
import Sidebar from "@/components/Chat/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { getConversations } from "@/server/actions/item";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    // Handle the case where there is no authenticated user
    return <div>Please log in to access this page.</div>;
  }

  const loadedConversations = await getConversations(userId);

  // Convert ObjectId to string
  const conversations = loadedConversations.map((conv) => ({
    ...conv,
    _id: conv._id.toString(),
  }));

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar
        chatHistory={conversations.map((conv) => ({
          id: conv._id,
          title: conv.messages[0]?.content.substring(0, 30) || "New Chat",
        }))}
      />
      <Interface userId={userId} conversations={conversations} />
    </div>
  );
};

export default Page;
