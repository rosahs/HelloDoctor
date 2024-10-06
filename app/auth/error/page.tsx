"use client";

import { CardWrapper } from "@/components/auth/FormWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const AuthErrorPage = () => {
  // const router = useRouter();
  // const { error } = router.query;

  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  return (
    <CardWrapper
      headerLabel={
        errorParam || "Oops! Something went wrong!"
      }
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default AuthErrorPage;
