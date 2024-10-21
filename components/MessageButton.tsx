"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createConversation } from "@/actions/messaging/conversation";
import { useCurrentRole } from "@/hooks/useCurrentRole";

interface MessageButtonProps {
  doctorId: string | undefined;
}

const MessageButton = ({
  doctorId,
}: MessageButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useCurrentRole();

  const role = userRole.toLowerCase();

  if (!doctorId) {
    return null;
  }

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { conversationId } = await createConversation(
        doctorId
      );
      router.push(`/${role}/messages/${conversationId}`);
    } catch (error) {
      console.error("MESSAGE_BUTTON_ERROR", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="flex items-center gap-2"
      variant="default"
      disabled={isLoading}
    >
      <MessageCircle className="h-4 w-4" />
      {isLoading ? "Loading..." : "Send Message"}
    </Button>
  );
};

export default MessageButton;
