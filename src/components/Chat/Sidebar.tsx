"use client";

import React, { useState } from "react";

interface ChatHistory {
  id: string;
  title: string;
}

interface SidebarProps {
  chatHistory: ChatHistory[];
}

function Sidebar({ chatHistory }: SidebarProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(
    chatHistory[0]?.id ?? null
  );

  const onChatSelect = (id: string) => {
    setSelectedChat(id);
  };

  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
      <div className="flex-1 overflow-auto">
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              className={`w-full text-left flex items-center gap-2 rounded-md p-2 hover:bg-muted transition-colors duration-200 ${
                selectedChat === chat.id ? "bg-muted" : ""
              }`}
              onClick={() => {
                setSelectedChat(chat.id);
              }}
            >
              <div className="font-medium">{chat.title}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
