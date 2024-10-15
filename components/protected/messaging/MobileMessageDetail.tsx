"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Image, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AvatarImage } from "@radix-ui/react-avatar";

const MobileMessageDetail = ({ userType, chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      content: "Hello, how are you?",
      timestamp: "10:30 AM",
    },
  ]);

  const currentChat = { id: chatId, name: "Rosa" };

  const handleSendMessage = () => {
    if (message.trim() === "") return; // Prevent sending empty messages

    const newMessage = {
      id: messages.length + 1,
      sender: userType,
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    // Clear the input after sending
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Sticky Header (Go Back Button & Chat Name) */}
      <div className="pl-3 p-2 border-b border-border sticky top-14 bg-bgLight  z-10 flex items-center">
        <Link href={`/${userType}/messages`}>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>

        <Avatar className="w-8 h-8 mr-3">
          <AvatarImage
            src={message.avatar || "/profile.jpg"}
            alt="user"
          />
        </Avatar>

        <h2 className="text-lg font-semibold">
          {currentChat.name}
        </h2>
      </div>

      {/* Scrollable Messages Area */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto bg-babyPowder">
        {messages.map((msg) => (
          <div
            key={msg.content}
            className={`mb-4 ${
              msg.sender === userType
                ? "text-right"
                : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.sender === userType
                  ? "bg-bgBlack text-primary-foreground"
                  : "bg-primaryColor/70"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-xs opacity-50">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Sticky input */}
      <div className="p-4 border-t border-border bg-bgLight fixed bottom-0 left-0 right-0 z-10">
        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="mr-2"
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className="h-5 w-5" />
          </Button>

          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 mr-2"
          />

          <Button
            className="!bg-primaryColor"
            size="icon"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMessageDetail;
