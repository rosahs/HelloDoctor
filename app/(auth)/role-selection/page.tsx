"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CardWrapper } from "@/components/auth/FormWrapper";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/userRole";
import {
  DOCTOR_LOGIN_REDIRECT,
  PATIENT_LOGIN_REDIRECT,
} from "@/routes";
import { setUserRole } from "@/actions/setUserRole";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

const RoleSelection = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(
    ""
  );
  const [success, setSuccess] = useState<
    string | undefined
  >("");

  const handleRoleSelection = async (
    selectedRole: string
  ) => {
    setError("");
    setSuccess("");

    const redirectTo =
      selectedRole === "DOCTOR"
        ? DOCTOR_LOGIN_REDIRECT
        : PATIENT_LOGIN_REDIRECT;

    startTransition(() => {
      setUserRole(selectedRole as UserRole).then((data) => {
        if (data.success) {
          setSuccess(data.success);
          router.push(redirectTo);
        } else {
          setError(data.error);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Select Your Role"
      backButtonLabel="Go Back"
      backButtonHref="/register"
      showSocial={false}
    >
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={() =>
              handleRoleSelection(UserRole.PATIENT)
            }
            disabled={isPending}
            className="w-full bg-primaryColor hover:bg-primaryColor/80"
          >
            I am a Patient
          </Button>
          <Button
            type="button"
            onClick={() =>
              handleRoleSelection(UserRole.DOCTOR)
            }
            disabled={isPending}
            className="w-full bg-primaryColor hover:bg-primaryColor/80"
          >
            I am a Doctor
          </Button>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default RoleSelection;
