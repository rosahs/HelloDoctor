import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Conversation } from "./MobileMessageList";

import { User } from "next-auth";

const SearchInput = ({
  conversations,
  setFilteredConversationsSearch,
  currentUserId,
}: {
  conversations: Conversation[];
  setFilteredConversationsSearch: React.Dispatch<
    React.SetStateAction<Conversation[]>
  >;
  currentUserId: string;
}) => {
  const [searchQuery, setSearchQuery] =
    useState<string>("");

  const getOtherUser = (
    conversation: Conversation
  ): User | undefined => {
    return conversation.users.find(
      (user) => user.id !== currentUserId
    );
  };

  const isConversationRead = (
    conversation: Conversation
  ): boolean => {
    return conversation.messages.every((message) =>
      message.seenIds.includes(currentUserId)
    );
  };

  useEffect(() => {
    const filteredConversations = conversations.filter(
      (conversation) => {
        const otherUser = getOtherUser(conversation);

        if (otherUser?.name)
          return otherUser?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
      }
    );
    setFilteredConversationsSearch(filteredConversations);
  }, [
    searchQuery,
    conversations,
    currentUserId,
    setFilteredConversationsSearch,
  ]);

  return (
    <div className="p-4 border-b border-border">
      <Input
        type="text"
        placeholder="Search conversation"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 bg-inputBg border-inputBorder placeholder-placeholder text-textDark"
      />
    </div>
  );
};

export default SearchInput;
