'use client';

import React, { useState, useEffect } from 'react';
import { sendMessage, getChatHistory, streamAIResponse } from './actions';

interface ChatProps {
  user: any; // Replace 'any' with a more specific type if possible
}

export default function Chat({ user }: ChatProps) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (user) {
      // fetchChatHistory();
    }
  }, [user]);

  // const fetchChatHistory = async () => {
  //   if (user) {
  //     const history = await getChatHistory(user.id);
  //     setMessages(history as React.SetStateAction<never[]>);
  //   }
  // };

  // const handleSendMessage = async () => {
  //   if (inputMessage.trim() && user) {
  //     await sendMessage(user.id, inputMessage);
  //     setInputMessage('');
  //     await streamAIResponse(inputMessage, (chunk) => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { content: chunk, isUser: false }
  //       ]);
  //     });
  //     fetchChatHistory();
  //   }
  // };

  return (
    <div>
      {/* Render your chat messages here */}
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      {/* <button onClick={handleSendMessage}>Send</button> */}
    </div>
  );
}
