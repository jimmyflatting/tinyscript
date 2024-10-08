"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createMessage, getConversations } from "@/server/actions/item";
import { useAuth } from "@clerk/nextjs";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  _id: string;
  messages: Message[];
}

interface InterfaceProps {
  userId: string;
  conversations: Conversation[];
}

const Interface: React.FC<InterfaceProps> = ({
  userId,
  conversations: initialConversations,
}) => {
  const { userId: userIdFromAuth } = useAuth();
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (userIdFromAuth) {
      loadConversations();
    }
  }, [userIdFromAuth]);

  const loadConversations = async () => {
    if (!userIdFromAuth) return;
    const loadedConversations = await getConversations(userIdFromAuth);
    const formattedConversations = loadedConversations.map((conv) => ({
      ...conv,
      _id: conv._id.toString(),
    }));
    setConversations(formattedConversations);
    if (formattedConversations.length > 0) {
      setCurrentConversation(formattedConversations[0]);
    }
  };

  const sendMessage = async () => {
    if (!userIdFromAuth || inputMessage.trim() === "") return;
    setIsTyping(true);

    try {
      const result = await createMessage(
        userIdFromAuth,
        inputMessage,
        currentConversation?._id.toString()
      );
      if (!currentConversation) {
        setCurrentConversation({
          _id: result.conversationId.toString(),
          messages: [
            { role: "user", content: result.userMessage },
            { role: "assistant", content: result.aiMessage },
          ],
        });
      } else {
        setCurrentConversation((prevConv) => ({
          ...prevConv!,
          messages: [
            ...prevConv!.messages,
            { role: "user", content: result.userMessage },
            { role: "assistant", content: result.aiMessage },
          ],
        }));
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
      setInputMessage("");
    }
  };

  const typeResponse = (response: string) => {
    let i = 0;
    setTypingText(response[0]);
    const typingInterval = setInterval(() => {
      if (i < response.length - 1) {
        i++;
        setTypingText((prev) => prev + response[i]);
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypingText("");
      }
    }, 50);
  };

  const copyToClipboard = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedStates((prev) => ({ ...prev, [key]: true }));
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [key]: false }));
        }, 2000);
        console.log("Code copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  }, []);

  const renderMessage = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let codeBlockCount = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <div key={lastIndex} className="whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </div>
        );
      }
      const language = match[1] || "plaintext";
      const code = match[2].trim();
      const codeBlockKey = `codeBlock-${codeBlockCount++}`;
      parts.push(
        <div
          key={match.index}
          className="relative border border-gray-300 bg-background rounded-md my-2"
        >
          <pre className="p-4 overflow-x-auto">
            <code className={`language-${language}`}>{code}</code>
          </pre>
          <button
            className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors duration-200"
            onClick={() => copyToClipboard(code, codeBlockKey)}
          >
            {copiedStates[codeBlockKey] ? "Copied!" : "Copy"}
          </button>
        </div>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(
        <div key={lastIndex} className="whitespace-pre-wrap">
          {content.slice(lastIndex)}
        </div>
      );
    }

    return parts;
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-6">
          {currentConversation?.messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              <div
                className={`rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                } p-3 text-sm max-w-[60%]`}
              >
                {renderMessage(message.content)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-muted p-3 text-sm max-w-[60%]">
                {typingText ? renderMessage(typingText) : <TypingIndicator />}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 bg-background p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="min-h-[48px] rounded-2xl resize-none pr-12"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={sendMessage}
          >
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
}

export default Interface;

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
