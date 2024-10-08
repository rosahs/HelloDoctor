"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailChangeSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { useSession } from "next-auth/react";
import { emailChange } from "@/actions/account-security/email-change";

export const EmailChangeForm = () => {
  const user = useCurrentUser();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<
    string | undefined
  >();

  const emailForm = useForm({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      email: user?.email as string,
    },
  });

  const onSubmit = (
    value: z.infer<typeof emailChangeSchema>
  ) => {
    startTransition(() => {
      emailChange(value)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            update({
              user: { ...user, email: value.email },
            });
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <section className="space-y-4 pb-8 border-b border-inputBorder">
      <h2 className="text-2xl font-semibold">
        Change Email
      </h2>
      <p className="text-textGray">
        Update your email address
      </p>
      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-labelColor">
                  New Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={user?.email as string}
                    {...field}
                    className="bg-inputBg border-inputBorder placeholder-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            className="bg-primaryColor hover:bg-primaryColor/80 text-babyPowder"
            disabled={isPending}
          >
            Change Email
          </Button>
        </form>
      </Form>
    </section>
  );
};