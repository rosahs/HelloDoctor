"use client";

import React from "react";
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

interface EmailChangeFormProps {
  onSubmit: (data: unknown) => void;
}

export const EmailChangeForm: React.FC<
  EmailChangeFormProps
> = ({ onSubmit }) => {
  const emailForm = useForm({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      newEmail: "",
    },
  });

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
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-labelColor">
                  New Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter new email"
                    {...field}
                    className="bg-inputBg border-inputBorder placeholder-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primaryColor hover:bg-primaryColor/80 text-babyPowder"
          >
            Change Email
          </Button>
        </form>
      </Form>
    </section>
  );
};
