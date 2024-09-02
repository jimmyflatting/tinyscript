import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const messages = [
  [
    {
      user: "user",
      content: "Hey there! How can I help you today?",
    },
    {
      user: "ai",
      content:
        "# I have a question about the new feature you mentioned. Can you explain how the **markdown** and `codeblocks` work?",
    },
  ],
  [
    {
      user: "user",
      content:
        "Sure, I'd be happy to help. The new feature allows you to use **Markdown** formatting in your messages, including: - Headers - **Bold** - `Inline code` - ``` Codeblocks ``` You can also copy the message text, including any Markdown formatting, by clicking the copy button.",
    },
    {
      user: "ai",
      content: "Awesome, that's really helpful. I'll give it a try. Thanks!",
    },
  ],
  [
    {
      user: "user",
      content:
        "Sure, I'd be happy to help. The new feature allows you to use **Markdown** formatting in your messages, including: - Headers - **Bold** - `Inline code` - ``` Codeblocks ``` You can also copy the message text, including any Markdown formatting, by clicking the copy button.",
    },
    {
      user: "ai",
      content: "Awesome, that's really helpful. I'll give it a try. Thanks!",
    },
  ],
];

function Interface() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-6">
          {messages.map((message, index) => (
            <>
              <div key={index} className="flex items-start gap-4 justify-end">
                <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground max-w-[60%]">
                  <div>{message[0].content}</div>
                </div>
              </div>
              <div className="flex items-start gap-4 ">
                <div className="rounded-lg bg-muted p-3 text-sm max-w-[60%]">
                  <p>{message[1].content}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 bg-background p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="min-h-[48px] rounded-2xl resize-none pr-16"
          />
          <Button type="submit" size="icon" className="absolute top-3 right-3">
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
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
