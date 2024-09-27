"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <Button size="lg" className="w-full" variant="outline">
      <FcGoogle className="h-5 w-5" />
    </Button>
  );
};
