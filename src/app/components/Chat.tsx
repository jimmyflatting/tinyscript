"use client";

import React, { useState, useEffect, useRef } from "react";
import { User } from "@prisma/client";
import { useAuth } from "@/contexts/AuthContext";

interface ChatMessage {
  id: string;
  name: string;
  createdAt: string;
  isUserMessage: boolean;
}

const Chat: React.FC = () => {
  const { user, setUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/app?userId=${user.id}`);
      const data = await response.json();
      setMessages(data.chatHistory || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setMessages([]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isWaiting) return;

    setIsWaiting(true);
    try {
      const response = await fetch("/api/app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          message: inputMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: data.userMessageId,
            name: inputMessage,
            createdAt: new Date().toISOString(),
            isUserMessage: true,
          },
        ]);
        setInputMessage("");
        if (user.subscriptionStatus !== "active") {
          setUser({ ...user, credits: data.remainingCredits });
        }

        // Start streaming the AI response
        setStreamedResponse("");
        const aiResponse = data.aiResponse;
        for (let i = 0; i < aiResponse.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust delay as needed
          setStreamedResponse((prev) => prev + aiResponse[i]);
        }

        // After streaming is complete, add the full message to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: data.aiMessageId,
            name: aiResponse,
            createdAt: new Date().toISOString(),
            isUserMessage: false,
          },
        ]);
        setStreamedResponse("");
      } else {
        console.error("Error sending message:", data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsWaiting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }

  return (
    <section className="flex flex-col h-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex-grow overflow-y-auto mb-6 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUserMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.isUserMessage
                    ? "bg-secondary text-white"
                    : "bg-card text-white"
                }`}
              >
                {message.isUserMessage ? (
                  <p className="text-sm">{message.name}</p>
                ) : (
                  <div className="text-sm">
                    {message.name.split("```").map((part, index) =>
                      index % 2 === 0 ? (
                        <p key={index} className="whitespace-pre-wrap">
                          {part}
                        </p>
                      ) : (
                        <div key={index} className="relative mt-2 mb-2">
                          <button
                            className="absolute top-2 right-2 border border-text text-text px-2 py-1 rounded text-xs"
                            onClick={(event) => {
                              navigator.clipboard.writeText(part);
                              const button = event.currentTarget;
                              const originalText = button.textContent;
                              button.textContent = "Copied";
                              setTimeout(() => {
                                button.textContent = originalText;
                              }, 2000);
                            }}
                          >
                            Copy
                          </button>
                          <pre className="bg-gray-800 text-white p-4 rounded-lg my-2 overflow-x-auto">
                            <code>{part.trim()}</code>
                          </pre>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
        {streamedResponse && (
          <div className="flex justify-start">
            <div className="max-w-[70%] p-3 rounded-lg bg-card text-white">
              <div className="text-sm">
                {streamedResponse.split("```").map((part, index) =>
                  index % 2 === 0 ? (
                    <p key={index} className="whitespace-pre-wrap">
                      {part}
                    </p>
                  ) : (
                    <div key={index} className="relative mt-2 mb-2">
                      <button
                        className="absolute top-2 right-2 border border-text text-text px-2 py-1 rounded text-xs"
                        onClick={(event) => {
                          navigator.clipboard.writeText(part);
                          const button = event.currentTarget;
                          const originalText = button.textContent;
                          button.textContent = "Copied";
                          setTimeout(() => {
                            button.textContent = originalText;
                          }, 2000);
                        }}
                      >
                        Copy
                      </button>
                      <pre className="bg-gray-800 text-white p-4 rounded-lg my-2 overflow-x-auto">
                        <code>{part.trim()}</code>
                      </pre>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {user.subscriptionStatus !== "active" && user.credits <= 0 ? (
        <div className="bg-card rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Out of Messages</h3>
          <p className="mb-4">
            You've used all your available messages. Upgrade to a Pro membership
            for unlimited access!
          </p>
          <button
            id="upgrade-btn"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className={`flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-card text-background ${
              isWaiting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isWaiting) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isWaiting}
          />
          <button
            onClick={handleSendMessage}
            className={`bg-card text-white p-3 rounded-r-lg transition-colors border border-primary ${
              isWaiting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-opacity-80"
            }`}
            disabled={isWaiting}
          >
            {isWaiting ? "Sending..." : "Send"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Chat;
