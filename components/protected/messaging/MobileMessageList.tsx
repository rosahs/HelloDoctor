/* eslint-disable */

"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";

// @ts-ignore
const MobileMessageList = ({ userType }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rosa",
      lastMessage: "Hello, how are you?",
      unread: true,
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      name: "Sara",
      lastMessage: "Are we still meeting today?",
      unread: false,
      timestamp: "Yesterday",
    },
  ]);

  const [swipedMessageId, setSwipedMessageId] =
    useState(null);
  const startXRef = useRef(0);

  const filteredMessages = messages.filter(
    (message) =>
      message.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (activeTab === "all" ||

        // @ts-ignore
        (activeTab === "read" && message.read) ||
        (activeTab === "unread" && message.unread))
  );

  // @ts-ignore
  const handleDelete = (id) => {
    setMessages(
      messages.filter((message) => message.id !== id)
    );
    setSwipedMessageId(null);
  };

  // @ts-ignore
  const handleTouchStart = (e, id) => {
    // Reset the previously swiped message if a new message is swiped
    if (swipedMessageId && swipedMessageId !== id) {
      const prevMessageElement = document.getElementById(
        `message-${swipedMessageId}`
      );
      if (prevMessageElement) {
        prevMessageElement.style.transform =
          "translateX(0)";
      }
    }

    startXRef.current = e.touches[0].clientX;
    setSwipedMessageId(id);
  };

  // @ts-ignore
  const handleTouchMove = (e) => {
    if (!swipedMessageId) return;

    const currentX = e.touches[0].clientX;
    const diff = startXRef.current - currentX;
    const messageElement = document.getElementById(
      `message-${swipedMessageId}`
    );

    if (diff > 0) {
      // Swipe left (show delete button)
      // @ts-ignore
      messageElement.style.transform = `translateX(-${Math.min(
        diff,
        80
      )}px)`;
    } else {
      // Swipe right (hide delete button)
      // @ts-ignore
      messageElement.style.transform = `translateX(${Math.min(
        -diff,
        0
      )}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!swipedMessageId) return;

    const messageElement = document.getElementById(
      `message-${swipedMessageId}`
    );
    const computedStyle =
    // @ts-ignore
      window.getComputedStyle(messageElement);
    const transform = new WebKitCSSMatrix(
      computedStyle.transform
    );

    // Check if swipe left enough to keep the delete button visible
    if (transform.m41 < -40) {
      // @ts-ignore
      messageElement.style.transform = "translateX(-80px)";
    } else {
      // Reset to default position if swiped back
      // @ts-ignore
      messageElement.style.transform = "translateX(0)";
      setSwipedMessageId(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bgLight">
      <div className="p-4 border-b border-border">
        <Input
          type="text"
          placeholder="Search message"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 bg-inputBg border-inputBorder placeholder-placeholder text-textDark"
        />
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 bg-inputBg border-inputBorder placeholder-placeholder">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ScrollArea className="flex-1">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            id={`message-${message.id}`}
            className="relative"
            onTouchStart={(e) =>
              handleTouchStart(e, message.id)
            }
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transition: "transform 0.2s ease-out",
            }}
          >
            <Link
              href={`/${userType}/messages/${message.id}`}
            >
              <div className="flex items-center p-4 border-b border-border cursor-pointer">
                <Avatar className="mr-4">
                  <AvatarImage
                  // @ts-ignore
                    src={message.avatar || "/profile.jpg"}
                  />
                </Avatar>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold">
                    {message.name}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {message.lastMessage}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground self-center">
                  {message.timestamp}
                </span>
              </div>
            </Link>

            <Button
              variant="destructive"
              size="sm"
              className="absolute top-0 right-0 bottom-0 w-20 rounded-none h-full"
              onClick={() => handleDelete(message.id)}
              style={{ transform: "translateX(100%)" }}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default MobileMessageList;
