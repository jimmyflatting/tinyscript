"use client";

import React, { useState } from "react";
import Interface from "@/components/Chat/Interface";
import Sidebar from "@/components/Chat/Sidebar";

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[][];
}

interface Message {
  user: "user" | "ai";
  content: string;
}

function Page() {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Hello World in C",
      messages: [
        [
          {
            user: "user",
            content: "Can you show me a Hello World program in C?",
          },
          {
            user: "ai",
            content: `Certainly! Here's a simple "Hello World" program in C:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

This program does the following:
1. It includes the standard input/output library.
2. It defines the main function, which is the entry point of the program.
3. It uses the printf function to output "Hello, World!" to the console.
4. It returns 0 to indicate successful execution.`,
          },
        ],
      ],
    },
    {
      id: "2",
      title: "Python Basics",
      messages: [
        [
          { user: "user", content: "How do I create a list in Python?" },
          {
            user: "ai",
            content: `In Python, you can create a list in several ways. Here are some examples:

1. Using square brackets:

\`\`\`python
my_list = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
\`\`\`

2. Using the list() constructor:

\`\`\`python
numbers = list(range(1, 6))  # Creates [1, 2, 3, 4, 5]
characters = list("Hello")   # Creates ['H', 'e', 'l', 'l', 'o']
\`\`\`

3. List comprehension:

\`\`\`python
squares = [x**2 for x in range(1, 6)]  # Creates [1, 4, 9, 16, 25]
\`\`\`

You can also create empty lists:

\`\`\`python
empty_list1 = []
empty_list2 = list()
\`\`\`

Lists in Python are versatile and can contain elements of different types.`,
          },
        ],
      ],
    },
    {
      id: "3",
      title: "JavaScript Functions",
      messages: [
        [
          {
            user: "user",
            content: "Can you explain arrow functions in JavaScript?",
          },
          {
            user: "ai",
            content: `Certainly! Arrow functions are a concise way to write function expressions in JavaScript. They were introduced in ES6 (ECMAScript 2015) and provide a shorter syntax compared to traditional function expressions.

Here's a basic example of an arrow function:

\`\`\`javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;
\`\`\`

Key features of arrow functions:

1. Shorter syntax: They allow you to omit the \`function\` keyword.

2. Implicit return: For single-expression functions, you can omit the \`return\` keyword and curly braces.

3. Lexical \`this\` binding: Arrow functions don't bind their own \`this\`, instead they inherit \`this\` from the enclosing scope.

Here are more examples:

\`\`\`javascript
// Single parameter (parentheses optional)
const square = x => x * x;

// Multiple parameters
const multiply = (x, y) => x * y;

// No parameters
const greet = () => console.log("Hello!");

// Multi-line function body
const sum = (a, b) => {
    let result = a + b;
    return result;
};

// Returning an object (wrap the object in parentheses)
const createPerson = (name, age) => ({ name, age });
\`\`\`

Arrow functions are particularly useful for short callback functions and when you want to preserve the lexical scope of \`this\`.`,
          },
        ],
      ],
    },
  ]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    chatHistory[0].id
  );

  const handleChatSelect = (id: string) => {
    setSelectedChatId(id);
  };

  const handleNewMessage = (message: Message) => {
    if (selectedChatId) {
      setChatHistory((prevHistory) =>
        prevHistory.map((chat) =>
          chat.id === selectedChatId
            ? {
                ...chat,
                messages:
                  message.user === "user"
                    ? [...chat.messages, [message]]
                    : [
                        ...chat.messages.slice(0, -1),
                        [...chat.messages[chat.messages.length - 1], message],
                      ],
              }
            : chat
        )
      );
    }
  };

  const selectedChat = chatHistory.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar chatHistory={chatHistory} onChatSelect={handleChatSelect} />
      <Interface
        messages={selectedChat?.messages || chatHistory[0]?.messages || []}
        onNewMessage={handleNewMessage}
      />
    </div>
  );
}

export default Page;
